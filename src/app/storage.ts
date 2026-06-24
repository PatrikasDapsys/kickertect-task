import type { WebStorage } from 'redux-persist'

function createNoopStorage(): WebStorage {
  return {
    getItem: () => Promise.resolve(null),
    setItem: () => Promise.resolve(),
    removeItem: () => Promise.resolve(),
  }
}

export function createLocalStorage(): WebStorage {
  if (typeof window === 'undefined' || !window.localStorage) {
    return createNoopStorage()
  }

  return {
    getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
    setItem: (key, value) => {
      window.localStorage.setItem(key, value)
      return Promise.resolve()
    },
    removeItem: (key) => {
      window.localStorage.removeItem(key)
      return Promise.resolve()
    },
  }
}
