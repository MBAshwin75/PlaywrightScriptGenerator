import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { Logger } from '../../utils/logger/Logger';
import { FrameworkConfig } from '../../config/framework.config';
import { RegistrationLocators } from './locators/registration.locators';

/**
 * Registration Page Object for:
 * https://ecommerce-playground.lambdatest.io/index.php?route=account/register
 *
 * Locators are defined in locators/registration.locators.ts.
 * This class only contains actions and orchestration.
 */
export class RegistrationPage extends BasePage {
  // -- Locator accessors (delegate to centralised locator file) --

  get firstNameInput(): Locator {
    return RegistrationLocators.firstNameInput(this.page);
  }

  get lastNameInput(): Locator {
    return RegistrationLocators.lastNameInput(this.page);
  }

  get emailInput(): Locator {
    return RegistrationLocators.emailInput(this.page);
  }

  get telephoneInput(): Locator {
    return RegistrationLocators.telephoneInput(this.page);
  }

  get passwordInput(): Locator {
    return RegistrationLocators.passwordInput(this.page);
  }

  get passwordConfirmInput(): Locator {
    return RegistrationLocators.passwordConfirmInput(this.page);
  }

  get newsletterYes(): Locator {
    return RegistrationLocators.newsletterYes(this.page);
  }

  get newsletterNo(): Locator {
    return RegistrationLocators.newsletterNo(this.page);
  }

  get privacyPolicyCheckbox(): Locator {
    return RegistrationLocators.privacyPolicyCheckbox(this.page);
  }

  get continueButton(): Locator {
    return RegistrationLocators.continueButton(this.page);
  }

  get pageHeading(): Locator {
    return RegistrationLocators.pageHeading(this.page);
  }

  get successHeading(): Locator {
    return RegistrationLocators.pageHeading(this.page);
  }

  get alertMessage(): Locator {
    return RegistrationLocators.alertMessage(this.page);
  }

  // -- Actions --

  /** Navigate to the registration page */
  async navigateToRegistration(): Promise<void> {
    await this.navigate(FrameworkConfig.routes.register);
    this.logger.step('navigateToRegistration', FrameworkConfig.routes.register);
  }

  /** Fill the first name field */
  async enterFirstName(firstName: string): Promise<void> {
    await this.validateAndFill(this.firstNameInput, firstName, 'enterFirstName');
  }

  /** Fill the last name field */
  async enterLastName(lastName: string): Promise<void> {
    await this.validateAndFill(this.lastNameInput, lastName, 'enterLastName');
  }

  /** Fill the email field */
  async enterEmail(email: string): Promise<void> {
    await this.validateAndFill(this.emailInput, email, 'enterEmail');
  }

  /** Fill the telephone field */
  async enterTelephone(telephone: string): Promise<void> {
    await this.validateAndFill(this.telephoneInput, telephone, 'enterTelephone');
  }

  /** Fill the password field */
  async enterPassword(password: string): Promise<void> {
    await this.validateAndFill(this.passwordInput, password, 'enterPassword');
  }

  /** Fill the password confirmation field */
  async enterPasswordConfirm(password: string): Promise<void> {
    await this.validateAndFill(this.passwordConfirmInput, password, 'enterPasswordConfirm');
  }

  /** Select newsletter subscription preference */
  async selectNewsletter(subscribe: boolean): Promise<void> {
    const target = subscribe ? this.newsletterYes : this.newsletterNo;
    await this.clickElement(target, `selectNewsletter(${subscribe})`);
  }

  /** Agree to the privacy policy */
  async agreeToPrivacyPolicy(): Promise<void> {
    await this.clickElement(this.privacyPolicyCheckbox, 'agreeToPrivacyPolicy');
  }

  /** Click Continue to submit the registration form */
  async submitRegistration(): Promise<void> {
    await this.validateAndClick(this.continueButton, 'submitRegistration');
  }

  /** Get current alert/warning text if present */
  async getAlertText(): Promise<string | null> {
    const visible = await this.isVisible(this.alertMessage);
    if (visible) {
      return this.getText(this.alertMessage);
    }
    return null;
  }

  /**
   * Complete the full registration flow in a single call.
   * Useful for data-driven tests.
   */
  async registerUser(data: {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    password: string;
    subscribe?: boolean;
  }): Promise<void> {
    this.logger.step('registerUser', `email=${data.email}`);
    await this.enterFirstName(data.firstName);
    await this.enterLastName(data.lastName);
    await this.enterEmail(data.email);
    await this.enterTelephone(data.telephone);
    await this.enterPassword(data.password);
    await this.enterPasswordConfirm(data.password);
    await this.selectNewsletter(data.subscribe ?? false);
    await this.agreeToPrivacyPolicy();
    await this.submitRegistration();
    this.logger.info('registerUser', `email=${data.email}`, 'form submitted');
  }
}
