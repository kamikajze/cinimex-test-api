import type { CreateUserRequest } from '../types/users';
import type { Credentials } from '../types/auth';

export const buildUser = (overrides: Partial<CreateUserRequest> = {}): CreateUserRequest => ({
  name: `qa-${Date.now()}`,
  job: 'QA Automation Engineer',
  ...overrides,
});

export const knownCredentials: Required<Credentials> = {
  email: 'eve.holt@reqres.in',
  password: 'pistol',
};

export const loginCredentials: Required<Credentials> = {
  email: 'eve.holt@reqres.in',
  password: 'cityslicka',
};
