import { defineConfig } from '@playwright/test';

const baseURL = process.env.BASE_URL ?? 'https://reqres.in/api/';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    extraHTTPHeaders: {
      Accept: 'application/json',
      'x-api-key': process.env.REQRES_API_KEY ?? 'reqres-free-v1',
    },
    trace: 'retain-on-failure',
  },
});
