//contains primitive types

export type Role = 'admin' | 'manager' | 'employee' | 'user';

export interface User {
  username: string,
  password: string,
  role: Role,
  bearerToken: string | null,
};

export interface LoginCredentials {
  username: string,
  password: string,
};

export interface AuthState {
  user: User | null,
  bearerToken: string | null,
  isAuthenticated: boolean,
};

export interface AuthResponse {
  bearerToken: string,
  user: User,
}

export interface AuthContextType {
  user: AuthResponse | null,
  login: (credentials: LoginCredentials) => Promise<AuthResponse>,
  logout: () => void,
  isAuthenticated: boolean,
}
