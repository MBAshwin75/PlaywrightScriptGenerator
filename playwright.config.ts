import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import * as dotenv from 'dotenv';
import * as path from 'path';

/** Load environment-specific config. Defaults to 'qa'. */
const ENV = process.env.TEST_ENV ?? 'qa';
dotenv.config({ path: path.resolve(__dirname, `config/env/${ENV}.env`) });

const BASE_URL = process.env.BASE_URL ?? 'https://ecommerce-playground.lambdatest.io';

/** BDD configuration – maps feature files to step definitions */
const testDir = defineBddConfig({
  features: './features/**/*.feature',
  steps: [
    './fixtures/testFixtures.ts',
    './steps/**/*.steps.ts',
    './steps/hooks.ts',
  ],
});

export default defineConfig({
  testDir,
  outputDir: './test-results',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only for stability */
  retries: process.env.CI ? 2 : 0,

  /* Parallel workers */
  workers: process.env.CI ? 2 : undefined,

  /* Reporters */
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'reports/html' }],
    ['allure-playwright', { outputFolder: 'allure-results', suiteTitle: true }],
  ],

  use: {
    baseURL: BASE_URL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    locale: 'en-US',
    timezoneId: 'America/New_York',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment to enable cross-browser testing
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
