import { INITIAL_STORES } from './data'

// Store and restore the list of stores
const LOCAL_STORAGE_KEY = 'store-locator-stores'

export function loadInitialStores() {
  if (typeof window === 'undefined') return INITIAL_STORES
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!raw) return INITIAL_STORES
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed) || parsed.length === 0) return INITIAL_STORES
    return parsed
  } catch {
    return INITIAL_STORES
  }
}

export function saveStores(stores) {
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stores))
  } catch {
    // ignore
  }
}

