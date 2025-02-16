import { createContext, FC, useCallback, useState } from 'react'
import { AuthResponse, LoginCredentials, AuthContextType } from '../types/auth-type';
import { authService } from '../services/auth.service';

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode,
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse | null>(null)

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const data = await authService.login(credentials)
      localStorage.setItem('user', JSON.stringify(data))
      setUser(data)
      return data
    } catch (err) {
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
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value} >
      {children}
    </AuthContext.Provider>
  )
}

