import { createContext, FC, useCallback, useState } from 'react'
import { AuthResponse, LoginCredentials, AuthContextType } from '../types/auth-type';
import { authService } from '../services/auth.service';

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode,
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)
      const data = await authService.login(credentials)
      localStorage.setItem('user', JSON.stringify(data))
      setUser(data)
      setIsLoading(false)
      return data
    } catch (err) {
      setIsLoading(false)
      throw new Error("Something went wrong" + err)
    }
  }, [])

  const register = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)
      const data = await authService.register(credentials)
      setIsLoading(false)
      return data
    } catch (err) {
      setIsLoading(false)
      throw new Error("Something went wrong" + err)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('user')
    setUser(null)
  }, [])

  const value: AuthContextType = {
    user,
    login,
    logout,
    register,
    isLoading,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value} >
      {children}
    </AuthContext.Provider>
  )
}

