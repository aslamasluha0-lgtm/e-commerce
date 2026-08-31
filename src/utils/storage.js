const STORAGE_KEYS = {
  TOKEN: 'devstore_token',
  CART: 'devstore_cart',
  WISHLIST: 'devstore_wishlist',
}

export const storage = {
  get: (key) => {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch {
      return null
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      console.error('Failed to save to localStorage')
    }
  },

  remove: (key) => {
    localStorage.removeItem(key)
  },

  clear: () => {
    localStorage.clear()
  },
}

export { STORAGE_KEYS }
