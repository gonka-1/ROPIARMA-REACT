import { useState, useEffect } from 'react'

export function useLocalStorageState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const raw = localStorage.getItem(key)
    if (raw === null) return defaultValue
    try {
      return JSON.parse(raw)
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
