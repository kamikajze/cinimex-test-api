import type { Support } from './common';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UsersListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: Support;
}

export interface SingleUserResponse {
  data: User;
  support: Support;
}

export interface CreateUserRequest {
  name: string;
  job: string;
}

export interface CreateUserResponse extends CreateUserRequest {
  id: string;
  createdAt: string;
}

export type UpdateUserRequest = Partial<CreateUserRequest>;

export interface UpdateUserResponse extends UpdateUserRequest {
  updatedAt: string;
}
