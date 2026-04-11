import type { Page, Locator } from '@playwright/test';

/**
 * Locator definitions for the Registration page.
 * Centralised here so page objects only reference these – no selectors in action methods.
 *
 * Each method takes a Page instance and returns a Playwright Locator.
 * This factory pattern keeps locators lazy (resolved at call-time) and page-scoped.
 */
export const RegistrationLocators = {
  /** First Name input */
  firstNameInput: (page: Page): Locator => page.locator('#input-firstname'),

  /** Last Name input */
  lastNameInput: (page: Page): Locator => page.locator('#input-lastname'),

  /** E-Mail input */
  emailInput: (page: Page): Locator => page.locator('#input-email'),

  /** Telephone input */
  telephoneInput: (page: Page): Locator => page.locator('#input-telephone'),

  /** Password input */
  passwordInput: (page: Page): Locator => page.locator('#input-password'),

  /** Password Confirm input */
  passwordConfirmInput: (page: Page): Locator => page.locator('#input-confirm'),

  /** Newsletter Subscribe radio – Yes */
  newsletterYes: (page: Page): Locator =>
    page.locator('label').filter({ hasText: 'Yes' }).locator('input[name="newsletter"]'),

  /** Newsletter Subscribe radio – No */
  newsletterNo: (page: Page): Locator =>
    page.locator('label').filter({ hasText: 'No' }).locator('input[name="newsletter"]'),

  /** Privacy Policy agree label (click target – label overlays the checkbox) */
  privacyPolicyCheckbox: (page: Page): Locator => page.locator('label[for="input-agree"]'),

  /** Continue / Submit button */
  continueButton: (page: Page): Locator =>
    page.locator('input[type="submit"][value="Continue"]'),

  /** Page heading / Success heading */
  pageHeading: (page: Page): Locator => page.locator('#content h1'),

  /** Alert / warning message div */
  alertMessage: (page: Page): Locator => page.locator('.alert'),
} as const;
