import { test as base, createBdd } from 'playwright-bdd';
import { Logger } from '../utils/logger/Logger';
import { RegistrationPage } from '../pages/auth/RegistrationPage';
import { LoginPage } from '../pages/auth/LoginPage';

/** Extended test context with custom fixtures */
export interface TestFixtures {
  logger: Logger;
  correlationId: string;
  registrationPage: RegistrationPage;
  loginPage: LoginPage;
}

/**
 * Custom Playwright fixtures extended for BDD.
 * Provides page objects, logger, and correlation ID to every step definition.
 */
export const test = base.extend<TestFixtures>({
  logger: async ({}, use) => {
    const logger = new Logger();
    await use(logger);
  },

  correlationId: async ({ logger }, use) => {
    await use(logger.getCorrelationId());
  },

  registrationPage: async ({ page, logger }, use) => {
    await use(new RegistrationPage(page, logger));
  },

  loginPage: async ({ page, logger }, use) => {
    await use(new LoginPage(page, logger));
  },
});

/** BDD step creators bound to the custom test instance */
export const {
  Given,
  When,
  Then,
  BeforeScenario,
  AfterScenario,
} = createBdd(test);

export { expect } from '@playwright/test';
