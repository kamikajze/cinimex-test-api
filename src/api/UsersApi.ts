import type { ApiClient } from './ApiClient';
import type { ApiResponse } from '../types/common';
import type {
  CreateUserRequest,
  CreateUserResponse,
  SingleUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UsersListResponse,
} from '../types/users';

export class UsersApi {
  private static readonly path = 'users';

  constructor(private readonly client: ApiClient) {}

  list(page = 1): Promise<ApiResponse<UsersListResponse>> {
    return this.client.get<UsersListResponse>(UsersApi.path, { params: { page } });
  }

  // Generic with a default: negative cases (404 -> `{}`) can override the body type.
  getById<T = SingleUserResponse>(id: number): Promise<ApiResponse<T>> {
    return this.client.get<T>(`${UsersApi.path}/${id}`);
  }

  create(payload: CreateUserRequest): Promise<ApiResponse<CreateUserResponse>> {
    return this.client.post<CreateUserResponse>(UsersApi.path, payload);
  }

  update(id: number, payload: UpdateUserRequest): Promise<ApiResponse<UpdateUserResponse>> {
    return this.client.put<UpdateUserResponse>(`${UsersApi.path}/${id}`, payload);
  }

  remove(id: number): Promise<ApiResponse<undefined>> {
    return this.client.delete(`${UsersApi.path}/${id}`);
  }
}
