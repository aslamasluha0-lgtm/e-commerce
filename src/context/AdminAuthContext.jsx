import { useMemo, useState } from 'react'
import { storage, STORAGE_KEYS } from '@/utils/storage'
import { adminAuthService } from '@/services/adminAuthService'
import { AdminAuthContext } from './admin-auth-context'

const getStoredAdmin = () => {
  const admin = storage.get(STORAGE_KEYS.ADMIN_USER)
  return admin && admin.role === 'admin' ? admin : null
}

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(getStoredAdmin)

  const login = async (credentials) => {
    const admin = await adminAuthService.login(credentials)
    const session = {
      id: admin.id,
      name: admin.name || admin.username || admin.email,
      email: admin.email,
      role: admin.role,
    }
    storage.set(STORAGE_KEYS.ADMIN_USER, session)
    setAdminUser(session)
    return session
  }

  const logout = () => {
    storage.remove(STORAGE_KEYS.ADMIN_USER)
    setAdminUser(null)
  }

  const value = useMemo(
    () => ({
      adminUser,
      isAuthenticated: Boolean(adminUser),
      login,
      logout,
    }),
    [adminUser]
  )

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  )
}