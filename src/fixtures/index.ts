import { test as base, expect } from '@playwright/test';
import { ApiClient } from '../api/ApiClient';
import { UsersApi } from '../api/UsersApi';
import { AuthApi } from '../api/AuthApi';

interface Api {
  users: UsersApi;
  auth: AuthApi;
}

/** Tests import `test` from here and get ready-to-use typed API objects. */
export const test = base.extend<{ api: Api }>({
  api: async ({ request }, use) => {
    const client = new ApiClient(request);
    await use({ users: new UsersApi(client), auth: new AuthApi(client) });
  },
});

export { expect };
