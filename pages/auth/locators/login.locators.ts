import type { Page, Locator } from '@playwright/test';

/**
 * Locator definitions for the Login page.
 * Centralised here so page objects only reference these – no selectors in action methods.
 */
export const LoginLocators = {
  /** Email address input in the Returning Customer section */
  emailInput: (page: Page): Locator => page.locator('#input-email'),

  /** Password input in the Returning Customer section */
  passwordInput: (page: Page): Locator => page.locator('#input-password'),

  /** Login submit button */
  loginButton: (page: Page): Locator =>
    page.locator('input[type="submit"][value="Login"]'),

  /** Forgotten Password link */
  forgottenPasswordLink: (page: Page): Locator =>
    page.getByRole('link', { name: 'Forgotten Password' }).first(),

  /** "New Customer" Continue button (leads to registration) */
  newCustomerContinueButton: (page: Page): Locator =>
    page.getByRole('link', { name: 'Continue' }).first(),

  /** Page heading */
  pageHeading: (page: Page): Locator => page.locator('#content h2').first(),

  /** Alert / warning message (danger variant) */
  alertMessage: (page: Page): Locator => page.locator('.alert-danger'),
} as const;
