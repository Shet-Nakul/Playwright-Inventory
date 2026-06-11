import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { User } from '../types'

interface AuthContextValue {
  user: User | null
  login: (username: string, password: string) => { ok: boolean; message: string }
  logout: () => void
}

// Demo credentials. These are intentionally hard-coded for an automation playground.
const VALID_CREDENTIALS: Record<string, { password: string; user: User }> = {
  admin: { password: 'admin123', user: { username: 'admin', name: 'Admin User', role: 'admin' } },
  manager: { password: 'manager123', user: { username: 'manager', name: 'Manager User', role: 'manager' } },
  viewer: { password: 'viewer123', user: { username: 'viewer', name: 'Viewer User', role: 'viewer' } },
}

const STORAGE_KEY = 'stockpilot.auth.user'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  })

  const login = useCallback((username: string, password: string) => {
    const entry = VALID_CREDENTIALS[username.trim().toLowerCase()]
    if (!entry || entry.password !== password) {
      return { ok: false, message: 'Invalid username or password.' }
    }
    setUser(entry.user)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entry.user))
    return { ok: true, message: 'Login successful.' }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
