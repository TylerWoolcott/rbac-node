import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { AuthContextType } from '../types/auth-type'

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within Auth Provider')
  }
  return context;
}


