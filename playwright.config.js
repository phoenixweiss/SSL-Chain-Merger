import { defineConfig } from '@playwright/test'

const appUrl = 'http://127.0.0.1:4173/SSL-Chain-Merger/'

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: appUrl,
    browserName: 'chromium',
    colorScheme: 'light',
    trace: 'retain-on-failure'
  },
  webServer: {
    command: 'yarn preview --host 127.0.0.1 --port 4173',
    url: appUrl,
    reuseExistingServer: !process.env.CI
  }
})
