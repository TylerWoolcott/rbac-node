import { api } from './api'
import { AuthResponse, LoginCredentials } from '../types/auth-type'

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials)
    localStorage.setItem('token', data.bearerToken)
    return data
  },
  async logout(): Promise<void> {
    await api.post('/auth/logout')
    localStorage.removeItem('token')
  },
  async register(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/register', credentials)
    return data
  },
  async getCurrentUser(): Promise<AuthResponse> {
    const { data } = await api.get<AuthResponse>('/auth/me')
    return data
  }
}
