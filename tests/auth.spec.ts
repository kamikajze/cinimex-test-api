import { test, expect } from '../src/fixtures';
import { errorSchema, loginSchema, registerSchema } from '../src/schemas';
import { knownCredentials, loginCredentials } from '../src/utils/testData';

test.describe('Auth API', () => {
  test('POST /register succeeds for a known user', async ({ api }) => {
    const { status, body } = await api.auth.register(knownCredentials);

    expect(status).toBe(200);
    registerSchema.parse(body);
  });

  test('POST /register without password returns 400', async ({ api }) => {
    const { status, body } = await api.auth.register({ email: knownCredentials.email });

    expect(status).toBe(400);
    expect(errorSchema.parse(body).error).toBe('Missing password');
  });

  test('POST /login returns a token', async ({ api }) => {
    const { status, body } = await api.auth.login(loginCredentials);

    expect(status).toBe(200);
    loginSchema.parse(body);
  });
});
