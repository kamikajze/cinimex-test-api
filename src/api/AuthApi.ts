import type { ApiClient } from './ApiClient';
import type { ApiResponse, ErrorResponse } from '../types/common';
import type { Credentials, LoginResponse, RegisterResponse } from '../types/auth';

export class AuthApi {
  constructor(private readonly client: ApiClient) {}

  register<T = RegisterResponse>(creds: Credentials): Promise<ApiResponse<T | ErrorResponse>> {
    return this.client.post<T | ErrorResponse>('register', creds);
  }

  login<T = LoginResponse>(creds: Credentials): Promise<ApiResponse<T | ErrorResponse>> {
    return this.client.post<T | ErrorResponse>('login', creds);
  }
}
