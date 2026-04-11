import { expect } from '@playwright/test';
import { Given, When, Then } from '../../fixtures/testFixtures';
import { generateUniqueEmail, generateRandomPhone } from '../../utils/helpers/dataHelper';

/**
 * Registration step definitions.
 * All interactions are delegated to RegistrationPage (POM).
 * Steps only orchestrate – no raw locator logic here.
 */

// -- Shared state within a scenario (via closure) --
let generatedEmail: string;
let generatedPhone: string;

// -- Navigation --

Given('I am on the registration page', async ({ registrationPage, logger }) => {
  logger.step('BDD:Given', 'I am on the registration page');
  await registrationPage.navigateToRegistration();
});

// -- Form input steps --

When('I enter first name {string}', async ({ registrationPage, logger }, firstName: string) => {
  logger.step('BDD:When', `I enter first name "${firstName}"`);
  await registrationPage.enterFirstName(firstName);
});

When('I enter last name {string}', async ({ registrationPage, logger }, lastName: string) => {
  logger.step('BDD:When', `I enter last name "${lastName}"`);
  await registrationPage.enterLastName(lastName);
});

When('I enter a unique email address', async ({ registrationPage, logger }) => {
  generatedEmail = generateUniqueEmail('bdd');
  logger.step('BDD:When', `I enter a unique email address: ${generatedEmail}`);
  await registrationPage.enterEmail(generatedEmail);
});

When('I enter email {string}', async ({ registrationPage, logger }, email: string) => {
  logger.step('BDD:When', `I enter email "${email}"`);
  await registrationPage.enterEmail(email);
});

When('I enter a random phone number', async ({ registrationPage, logger }) => {
  generatedPhone = generateRandomPhone();
  logger.step('BDD:When', `I enter a random phone number: ${generatedPhone}`);
  await registrationPage.enterTelephone(generatedPhone);
});

When('I enter telephone {string}', async ({ registrationPage, logger }, telephone: string) => {
  logger.step('BDD:When', `I enter telephone "${telephone}"`);
  await registrationPage.enterTelephone(telephone);
});

When('I enter password {string}', async ({ registrationPage, logger }, password: string) => {
  logger.step('BDD:When', `I enter password`);
  await registrationPage.enterPassword(password);
});

When('I confirm password {string}', async ({ registrationPage, logger }, password: string) => {
  logger.step('BDD:When', `I confirm password`);
  await registrationPage.enterPasswordConfirm(password);
});

When('I agree to the privacy policy', async ({ registrationPage, logger }) => {
  logger.step('BDD:When', 'I agree to the privacy policy');
  await registrationPage.agreeToPrivacyPolicy();
});

When('I submit the registration form', async ({ registrationPage, logger }) => {
  logger.step('BDD:When', 'I submit the registration form');
  await registrationPage.submitRegistration();
});

// -- Assertions --

Then('I should see the registration success page', async ({ registrationPage, logger }) => {
  logger.step('BDD:Then', 'I should see the registration success page');
  await registrationPage.waitForURLContains('account/success');
});

Then(
  'the success message should contain {string}',
  async ({ registrationPage, logger }, expectedText: string) => {
    logger.step('BDD:Then', `the success message should contain "${expectedText}"`);
    const heading = registrationPage.successHeading;
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(expectedText);
  },
);

Then('I should remain on the registration page', async ({ registrationPage, logger }) => {
  logger.step('BDD:Then', 'I should remain on the registration page');
  const currentUrl = registrationPage.getCurrentURL();
  expect(currentUrl).toContain('account/register');
});

// -- Layout assertions --

Then('the first name field should be visible', async ({ registrationPage }) => {
  await expect(registrationPage.firstNameInput).toBeVisible();
});

Then('the last name field should be visible', async ({ registrationPage }) => {
  await expect(registrationPage.lastNameInput).toBeVisible();
});

Then('the email field should be visible', async ({ registrationPage }) => {
  await expect(registrationPage.emailInput).toBeVisible();
});

Then('the telephone field should be visible', async ({ registrationPage }) => {
  await expect(registrationPage.telephoneInput).toBeVisible();
});

Then('the password field should be visible', async ({ registrationPage }) => {
  await expect(registrationPage.passwordInput).toBeVisible();
});

Then('the password confirm field should be visible', async ({ registrationPage }) => {
  await expect(registrationPage.passwordConfirmInput).toBeVisible();
});

Then('the continue button should be visible', async ({ registrationPage }) => {
  await expect(registrationPage.continueButton).toBeVisible();
});

Then('the privacy policy checkbox should be present', async ({ registrationPage }) => {
  await expect(registrationPage.privacyPolicyCheckbox).toBeAttached();
});
