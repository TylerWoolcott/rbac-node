//contains primitive types

export type Role = 'admin' | 'manager' | 'employee' | 'user';

export interface User {
  userName: string,
  password: string,
  role: Role,
};

export interface LoginCredentials {
  userName: string,
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
