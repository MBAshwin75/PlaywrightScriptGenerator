import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { Logger } from '../../utils/logger/Logger';
import { FrameworkConfig } from '../../config/framework.config';
import { LoginLocators } from './locators/login.locators';

/**
 * Login Page Object for:
 * https://ecommerce-playground.lambdatest.io/index.php?route=account/login
 *
 * Locators are defined in locators/login.locators.ts.
 * This class only contains actions and orchestration.
 */
export class LoginPage extends BasePage {
  // -- Locator accessors (delegate to centralised locator file) --

  get emailInput(): Locator {
    return LoginLocators.emailInput(this.page);
  }

  get passwordInput(): Locator {
    return LoginLocators.passwordInput(this.page);
  }

  get loginButton(): Locator {
    return LoginLocators.loginButton(this.page);
  }

  get forgottenPasswordLink(): Locator {
    return LoginLocators.forgottenPasswordLink(this.page);
  }

  get newCustomerContinueButton(): Locator {
    return LoginLocators.newCustomerContinueButton(this.page);
  }

  get pageHeading(): Locator {
    return LoginLocators.pageHeading(this.page);
  }

  get alertMessage(): Locator {
    return LoginLocators.alertMessage(this.page);
  }

  // -- Actions --

  /** Navigate to the login page */
  async navigateToLogin(): Promise<void> {
    await this.navigate(FrameworkConfig.routes.login);
    this.logger.step('navigateToLogin', FrameworkConfig.routes.login);
  }

  /** Enter email address */
  async enterEmail(email: string): Promise<void> {
    await this.validateAndFill(this.emailInput, email, 'enterEmail');
  }

  /** Enter password */
  async enterPassword(password: string): Promise<void> {
    await this.validateAndFill(this.passwordInput, password, 'enterPassword');
  }

  /** Click the Login button */
  async clickLogin(): Promise<void> {
    await this.validateAndClick(this.loginButton, 'clickLogin');
  }

  /** Click Forgotten Password link */
  async clickForgottenPassword(): Promise<void> {
    await this.clickElement(this.forgottenPasswordLink, 'clickForgottenPassword');
  }

  /** Navigate to registration from the login page */
  async clickContinueToRegister(): Promise<void> {
    await this.clickElement(this.newCustomerContinueButton, 'clickContinueToRegister');
  }

  /** Get alert text if visible */
  async getAlertText(): Promise<string | null> {
    const visible = await this.isVisible(this.alertMessage);
    if (visible) {
      return this.getText(this.alertMessage);
    }
    return null;
  }

  /**
   * Perform a complete login action.
   */
  async login(email: string, password: string): Promise<void> {
    this.logger.step('login', `email=${email}`);
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
    this.logger.info('login', `email=${email}`, 'login submitted');
  }
}
