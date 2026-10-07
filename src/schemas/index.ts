import { z } from 'zod';
import type {
  CreateUserResponse,
  SingleUserResponse,
  User,
  UsersListResponse,
} from '../types/users';
import type { LoginResponse, RegisterResponse } from '../types/auth';
import type { ErrorResponse, Support } from '../types/common';

const supportSchema: z.ZodType<Support> = z.object({
  url: z.string().url(),
  text: z.string(),
});

export const userSchema: z.ZodType<User> = z.object({
  id: z.number().int().positive(),
  email: z.string().email(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  avatar: z.string().url(),
});

export const usersListSchema: z.ZodType<UsersListResponse> = z.object({
  page: z.number().int(),
  per_page: z.number().int(),
  total: z.number().int(),
  total_pages: z.number().int(),
  data: z.array(userSchema),
  support: supportSchema,
});

export const singleUserSchema: z.ZodType<SingleUserResponse> = z.object({
  data: userSchema,
  support: supportSchema,
});

export const createUserSchema: z.ZodType<CreateUserResponse> = z.object({
  name: z.string(),
  job: z.string(),
  id: z.string().min(1),
  createdAt: z.string().datetime(),
});

export const registerSchema: z.ZodType<RegisterResponse> = z.object({
  id: z.number().int(),
  token: z.string().min(1),
});

export const loginSchema: z.ZodType<LoginResponse> = z.object({
  token: z.string().min(1),
});

export const errorSchema: z.ZodType<ErrorResponse> = z.object({
  error: z.string().min(1),
});
