import axiosInstance from './api/axiosInstance'
import { API_ENDPOINTS } from './api/apiConstants'
import { storage } from '@/utils/storage'

const STORAGE_KEYS_LOCAL = {
  TOKEN: 'devstore_token',
  USER: 'devstore_user',
}

const generateToken = () => {
  return btoa(`${Date.now()}-${Math.random().toString(36).slice(2)}`)
}

const storeAuth = (token, user) => {
  storage.set(STORAGE_KEYS_LOCAL.TOKEN, token)
  storage.set(STORAGE_KEYS_LOCAL.USER, user)
}

export const authService = {
  login: async (credentials) => {
    const { data: users } = await axiosInstance.get(API_ENDPOINTS.USERS, {
      params: { email: credentials.email },
    })

    if (users.length === 0) {
      throw new Error('No account found with this email')
    }

    const user = users[0]

    if (user.password !== credentials.password) {
      throw new Error('Invalid password')
    }

    const token = generateToken()
    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone }
    storeAuth(token, safeUser)

    return { token, user: safeUser }
  },

  register: async ({ name, email, password }) => {
    const { data: existingUsers } = await axiosInstance.get(API_ENDPOINTS.USERS, {
      params: { email },
    })

    if (existingUsers.length > 0) {
      throw new Error('An account with this email already exists')
    }

    const newUser = {
      name,
      email,
      password,
      role: 'customer',
      createdAt: new Date().toISOString(),
    }

    const { data: created } = await axiosInstance.post(API_ENDPOINTS.USERS, newUser)
    const token = generateToken()
    const safeUser = { id: created.id, name: created.name, email: created.email, role: created.role }
    storeAuth(token, safeUser)

    return { token, user: safeUser }
  },

  logout: () => {
    storage.remove(STORAGE_KEYS_LOCAL.TOKEN)
    storage.remove(STORAGE_KEYS_LOCAL.USER)
  },

  getProfile: () => {
    return storage.get(STORAGE_KEYS_LOCAL.USER)
  },

  getStoredToken: () => {
    return storage.get(STORAGE_KEYS_LOCAL.TOKEN)
  },
}
