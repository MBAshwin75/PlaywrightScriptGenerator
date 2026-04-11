import type { Locator, Page } from '@playwright/test';
import { Logger } from '../../utils/logger/Logger';
import { WaitHelper } from '../../utils/helpers/waitHelper';
import { FrameworkConfig } from '../../config/framework.config';

/**
 * Base Page – shared functionality inherited by all page objects.
 * Every interaction is logged and uses smart waits.
 */
export class BasePage {
  protected readonly page: Page;
  protected readonly logger: Logger;
  protected readonly waitHelper: WaitHelper;

  constructor(page: Page, logger: Logger) {
    this.page = page;
    this.logger = logger;
    this.waitHelper = new WaitHelper(page);
  }

  /** Navigate to a path relative to baseURL, or use the full route from config */
  async navigate(path?: string): Promise<void> {
    const target = path ?? '/';
    this.logger.step('navigate', target);
    await this.page.goto(target, { waitUntil: 'domcontentloaded' });
    this.logger.info('navigate', target, 'completed');
  }

  /** Click an element with logging and smart wait */
  async clickElement(locator: Locator, stepName = 'clickElement'): Promise<void> {
    this.logger.step(stepName, locator.toString());
    await this.waitHelper.waitForVisible(locator);
    await locator.click();
    this.logger.info(stepName, locator.toString(), 'clicked');
  }

  /** Fill an input element with a value */
  async fillElement(locator: Locator, value: string, stepName = 'fillElement'): Promise<void> {
    this.logger.step(stepName, `${locator.toString()} → "${value}"`);
    await this.waitHelper.waitForVisible(locator);
    await locator.fill(value);
    this.logger.info(stepName, `${locator.toString()} → "${value}"`, 'filled');
  }

  /** Get the inner text of an element */
  async getText(locator: Locator): Promise<string> {
    await this.waitHelper.waitForVisible(locator);
    const text = await locator.innerText();
    this.logger.info('getText', locator.toString(), text);
    return text;
  }

  /** Check if an element is visible (no throw) */
  async isVisible(locator: Locator): Promise<boolean> {
    const visible = await locator.isVisible();
    this.logger.debug('isVisible', locator.toString(), String(visible));
    return visible;
  }

  /** Wait until an element is visible */
  async waitForVisible(locator: Locator, timeout?: number): Promise<void> {
    this.logger.step('waitForVisible', locator.toString());
    await this.waitHelper.waitForVisible(locator, timeout);
  }

  /** Wait until the URL contains a substring */
  async waitForURLContains(value: string, timeout?: number): Promise<void> {
    this.logger.step('waitForURLContains', value);
    await this.waitHelper.waitForURLContains(
      value,
      timeout ?? FrameworkConfig.defaultNavigationTimeout,
    );
    this.logger.info('waitForURLContains', value, 'matched');
  }

  /** Press a key on a focused locator */
  async safePress(locator: Locator, key: string): Promise<void> {
    this.logger.step('safePress', `${locator.toString()} → ${key}`);
    await this.waitHelper.waitForVisible(locator);
    await locator.press(key);
    this.logger.info('safePress', key, 'pressed');
  }

  /** Select an option from a dropdown */
  async selectOption(locator: Locator, value: string): Promise<void> {
    this.logger.step('selectOption', `${locator.toString()} → ${value}`);
    await this.waitHelper.waitForVisible(locator);
    await locator.selectOption(value);
    this.logger.info('selectOption', value, 'selected');
  }

  /** Validate element is visible and enabled, then click */
  async validateAndClick(locator: Locator, stepName = 'validateAndClick'): Promise<void> {
    this.logger.step(stepName, locator.toString());
    await this.waitHelper.waitForVisible(locator);
    await this.waitHelper.waitForEnabled(locator);
    await locator.click();
    this.logger.info(stepName, locator.toString(), 'validated & clicked');
  }

  /** Validate element is visible and enabled, then fill */
  async validateAndFill(
    locator: Locator,
    value: string,
    stepName = 'validateAndFill',
  ): Promise<void> {
    this.logger.step(stepName, `${locator.toString()} → "${value}"`);
    await this.waitHelper.waitForVisible(locator);
    await this.waitHelper.waitForEnabled(locator);
    await locator.fill(value);
    this.logger.info(stepName, `${locator.toString()} → "${value}"`, 'validated & filled');
  }

  /** Capture a screenshot and return the buffer for attachment */
  async attachScreenshotToReport(name: string): Promise<Buffer> {
    this.logger.step('screenshot', name);
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.logger.info('screenshot', name, 'captured');
    return screenshot;
  }

  /** Get current page URL */
  getCurrentURL(): string {
    return this.page.url();
  }

  /** Get current page title */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }
}
