/**
 * Central framework configuration.
 * All framework-level settings and defaults are defined here.
 */

export const FrameworkConfig = {
  /** Default timeout for element actions (ms) */
  defaultActionTimeout: 15_000,

  /** Default timeout for navigation (ms) */
  defaultNavigationTimeout: 30_000,

  /** Default timeout for assertions (ms) */
  defaultExpectTimeout: 10_000,

  /** Maximum retries for flaky element interactions */
  maxRetries: 3,

  /** Retry delay between attempts (ms) */
  retryDelay: 1_000,

  /** Log output directory */
  logDir: 'reports/logs',

  /** Allure results output directory */
  allureResultsDir: process.env.ALLURE_RESULTS_DIR ?? 'allure-results',

  /** Supported environments */
  environments: ['qa', 'staging'] as const,

  /** Current test environment */
  currentEnv: (process.env.TEST_ENV ?? 'qa') as 'qa' | 'staging',

  /** Base URL – sourced from env */
  baseUrl: process.env.BASE_URL ?? 'https://ecommerce-playground.lambdatest.io',

  /** Routes used across the AUT */
  routes: {
    home: '/',
    register: '/index.php?route=account/register',
    login: '/index.php?route=account/login',
    account: '/index.php?route=account/account',
    catalog: '/index.php?route=product/category',
  },
} as const;

export type Environment = (typeof FrameworkConfig.environments)[number];
