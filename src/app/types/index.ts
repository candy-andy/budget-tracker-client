export interface LoginError {
  errorMessage: string;
  field: LoginFieldType;
}

export type LoginFieldType = 'email' | 'password';

export interface User {
  email: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegistration {
  email: string;
  password: string;
}

export interface UserRegistrationResponse {
  email: string;
}
