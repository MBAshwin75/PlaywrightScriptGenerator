import { expect } from '@playwright/test';
import { Given, When, Then } from '../../fixtures/testFixtures';

/**
 * Login step definitions.
 * All interactions are delegated to LoginPage (POM).
 */

// -- Navigation --

Given('I am on the login page', async ({ loginPage, logger }) => {
  logger.step('BDD:Given', 'I am on the login page');
  await loginPage.navigateToLogin();
});

// -- Form input steps --

When('I enter login email {string}', async ({ loginPage, logger }, email: string) => {
  logger.step('BDD:When', `I enter login email "${email}"`);
  await loginPage.enterEmail(email);
});

When('I enter login password {string}', async ({ loginPage, logger }, password: string) => {
  logger.step('BDD:When', 'I enter login password');
  await loginPage.enterPassword(password);
});

When('I click the login button', async ({ loginPage, logger }) => {
  logger.step('BDD:When', 'I click the login button');
  await loginPage.clickLogin();
});

When('I click continue to register', async ({ loginPage, logger }) => {
  logger.step('BDD:When', 'I click continue to register');
  await loginPage.clickContinueToRegister();
});

// -- Assertions --

Then('I should see a login error message', async ({ loginPage, logger }) => {
  logger.step('BDD:Then', 'I should see a login error message');
  await expect(loginPage.alertMessage).toBeVisible();
});

Then('the email input should be visible', async ({ loginPage }) => {
  await expect(loginPage.emailInput).toBeVisible();
});

Then('the password input should be visible', async ({ loginPage }) => {
  await expect(loginPage.passwordInput).toBeVisible();
});

Then('the login button should be visible', async ({ loginPage }) => {
  await expect(loginPage.loginButton).toBeVisible();
});

Then('the forgotten password link should be visible', async ({ loginPage }) => {
  await expect(loginPage.forgottenPasswordLink).toBeVisible();
});

Then('I should be on the registration page', async ({ page, logger }) => {
  logger.step('BDD:Then', 'I should be on the registration page');
  await page.waitForURL(/account\/register/, { timeout: 15_000 });
  expect(page.url()).toContain('register');
});
