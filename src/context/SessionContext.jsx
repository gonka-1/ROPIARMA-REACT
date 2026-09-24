import { createContext, useContext } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState'

const SessionContext = createContext(null)

export function obtenerNombreUsuario(email, nombre) {
  if (nombre && nombre.trim()) return nombre.trim()
  const usuario = email.split('@')[0] || email
  return usuario
    .replace(/[._-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ')
}

export function SessionProvider({ children }) {
  const [user, setUser] = useLocalStorageState('sesion', null)

  function login(datos) {
    setUser((actual) => ({ ...actual, ...datos }))
  }

  function logout() {
    setUser(null)
  }

  function saveTempRegistration(datos) {
    sessionStorage.setItem('registro', JSON.stringify(datos))
  }

  function getTempRegistration() {
    const raw = sessionStorage.getItem('registro')
    if (!raw) return null
    try {
      return JSON.parse(raw)
    } catch {
      return null
    }
  }

  function clearTempRegistration() {
    sessionStorage.removeItem('registro')
  }

  const value = {
    user,
    login,
    logout,
    saveTempRegistration,
    getTempRegistration,
    clearTempRegistration,
  }

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession debe usarse dentro de <SessionProvider>')
  return ctx
}
