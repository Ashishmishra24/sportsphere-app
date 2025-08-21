import React, { useEffect } from 'react'
import { AuthService } from '../services/authService'
import { useAuthStore } from '../stores/authStore'

const authService = new AuthService()

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setUser, setLoading } = useAuthStore()

  useEffect(() => {
    // Check initial auth state
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser()
        setUser(user)
      } catch (error) {
        console.error('Auth check failed:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Set up auth state listener
    const unsubscribe = authService.onAuthStateChange((user) => {
      setUser(user)
    })

    return () => {
      unsubscribe.data?.subscription?.unsubscribe()
    }
  }, [setUser, setLoading])

  return <>{children}</>
}
