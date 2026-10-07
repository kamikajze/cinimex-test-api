import { test, expect } from '../src/fixtures';
import { createUserSchema, singleUserSchema, usersListSchema } from '../src/schemas';
import { buildUser } from '../src/utils/testData';
import type { EmptyObject } from '../src/types/common';

test.describe('Users API', () => {
  test('GET /users?page=2 returns a paginated list', async ({ api }) => {
    const { status, body } = await api.users.list(2);

    expect(status).toBe(200);
    const parsed = usersListSchema.parse(body); 
    expect(parsed.page).toBe(2);
    expect(parsed.data).toHaveLength(parsed.per_page);
    expect(parsed.total).toBeGreaterThanOrEqual(parsed.data.length);
  });

  test('GET /users/:id returns a single user', async ({ api }) => {
    const { status, body } = await api.users.getById(2);

    expect(status).toBe(200);
    const parsed = singleUserSchema.parse(body);
    expect(parsed.data.id).toBe(2);
  });

  test('GET /users/:id for a missing user returns 404 and empty body', async ({ api }) => {
    const { status, body } = await api.users.getById<EmptyObject>(23);

    expect(status).toBe(404);
    expect(body).toEqual({});
  });

  test('POST /users creates a user and echoes the payload', async ({ api }) => {
    const payload = buildUser();
    const { status, body } = await api.users.create(payload);

    expect(status).toBe(201);
    const parsed = createUserSchema.parse(body);
    expect(parsed).toMatchObject({ name: payload.name, job: payload.job });
    expect(Math.abs(Date.now() - Date.parse(parsed.createdAt))).toBeLessThan(60_000);
  });
});
