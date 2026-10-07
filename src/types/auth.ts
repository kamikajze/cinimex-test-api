export interface Credentials {
  email: string;
  password?: string;
}

export interface RegisterResponse {
  id: number;
  token: string;
}

export interface LoginResponse {
  token: string;
}
