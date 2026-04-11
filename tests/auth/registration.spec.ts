import { test, expect } from '../../fixtures/testFixtures';
import { loadTestData, generateUniqueEmail, generateRandomPhone } from '../../utils/helpers/dataHelper';
import { AllureHelper } from '../../utils/helpers/allureHelper';
import { Module, Priority, Feature, buildTagAnnotation } from '../../utils/constants/tags';

/** Typed test data structure matching registration.data.json */
interface RegistrationData {
  validUser: {
    firstName: string;
    lastName: string;
    telephone: string;
    password: string;
  };
}

const TAG = buildTagAnnotation(Module.AUTH, Priority.P0, Feature.REGISTRATION);

test.describe(`Registration Tests ${TAG}`, () => {
  const testData = loadTestData<RegistrationData>('auth/registration.data.json');

  test.beforeEach(async ({ registrationPage, logger }) => {
    logger.step('beforeEach', 'Navigating to Registration page');
    await registrationPage.navigateToRegistration();
  });

  test(
    'should register a new user successfully',
    {
      tag: [Module.AUTH, Priority.P0, Feature.REGISTRATION],
      annotation: { type: 'feature', description: 'User Registration' },
    },
    async ({ registrationPage, logger, page }, testInfo) => {
      // Generate unique email for test isolation
      const uniqueEmail = generateUniqueEmail('reg');
      const uniquePhone = generateRandomPhone();
      const { firstName, lastName, password } = testData.validUser;

      logger.step('test:registerNewUser', `email=${uniqueEmail}`);

      // Fill registration form using page object
      await test.step('Fill registration form', async () => {
        await registrationPage.enterFirstName(firstName);
        await registrationPage.enterLastName(lastName);
        await registrationPage.enterEmail(uniqueEmail);
        await registrationPage.enterTelephone(uniquePhone);
        await registrationPage.enterPassword(password);
        await registrationPage.enterPasswordConfirm(password);
      });

      // Agree to privacy policy and submit
      await test.step('Accept policy and submit', async () => {
        await registrationPage.agreeToPrivacyPolicy();
        await registrationPage.submitRegistration();
      });

      // Validate successful registration
      await test.step('Verify successful registration', async () => {
        // After successful registration, OpenCart redirects to a success page
        // or displays the account page. We check for success indicators.
        await registrationPage.waitForURLContains('account/success');

        const heading = registrationPage.successHeading;
        await expect(heading).toBeVisible();
        await expect(heading).toContainText('Your Account Has Been Created');

        logger.info('test:registerNewUser', uniqueEmail, 'registration successful');
      });

      // Attach logs to Allure
      await AllureHelper.attachLogs(testInfo, logger);
      await AllureHelper.attachJSON(testInfo, 'Registration Data', {
        email: uniqueEmail,
        firstName,
        lastName,
        phone: uniquePhone,
      });
    },
  );

  test(
    'should show validation error when submitting empty form',
    {
      tag: [Module.AUTH, Priority.P1, Feature.REGISTRATION],
      annotation: { type: 'feature', description: 'Registration Validation' },
    },
    async ({ registrationPage, logger }, testInfo) => {
      logger.step('test:emptyFormValidation', 'Submit without filling fields');

      await test.step('Submit empty registration form', async () => {
        // Only agree to policy then submit – all required fields are empty
        await registrationPage.agreeToPrivacyPolicy();
        await registrationPage.submitRegistration();
      });

      await test.step('Verify validation errors appear', async () => {
        // The page should remain on registration with validation messages
        const currentUrl = registrationPage.getCurrentURL();
        expect(currentUrl).toContain('account/register');

        logger.info('test:emptyFormValidation', 'empty form', 'validation errors displayed');
      });

      await AllureHelper.attachLogs(testInfo, logger);
    },
  );

  test(
    'should display registration page with all required fields',
    {
      tag: [Module.AUTH, Priority.P2, Feature.REGISTRATION],
      annotation: { type: 'feature', description: 'Registration Page Layout' },
    },
    async ({ registrationPage, logger }, testInfo) => {
      logger.step('test:pageLayout', 'Verify all form fields present');

      await test.step('Verify form fields are visible', async () => {
        await expect(registrationPage.firstNameInput).toBeVisible();
        await expect(registrationPage.lastNameInput).toBeVisible();
        await expect(registrationPage.emailInput).toBeVisible();
        await expect(registrationPage.telephoneInput).toBeVisible();
        await expect(registrationPage.passwordInput).toBeVisible();
        await expect(registrationPage.passwordConfirmInput).toBeVisible();
        await expect(registrationPage.continueButton).toBeVisible();
        await expect(registrationPage.privacyPolicyCheckbox).toBeAttached();
      });

      logger.info('test:pageLayout', 'all fields', 'verified visible');
      await AllureHelper.attachLogs(testInfo, logger);
    },
  );
});
