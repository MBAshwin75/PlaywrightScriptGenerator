import type { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger/Logger';

/**
 * BasePage - Base class for all Page Objects
 * Provides common methods for interacting with web elements with logging
 * All page objects should extend this class
 */
export class BasePage {
  readonly page: Page;
  protected logger: Logger;

  constructor(page: Page, logger: Logger) {
    this.page = page;
    this.logger = logger;
  }

  async navigate(path: string): Promise<this> {
    this.logger.info(`🌐 Navigating to: ${path}`);
    await this.page.goto(path, { waitUntil: 'load' });
    this.logger.info(`✅ Navigation complete`);
    return this;
  }

  async clickElement(locator: Locator, stepName: string): Promise<this> {
    this.logger.info(`👆 Clicking: ${stepName}`);
    await locator.click();
    this.logger.info(`✅ Click successful`);
    return this;
  }

  async fillElement(locator: Locator, value: string, stepName: string): Promise<this> {
    this.logger.info(`⌨️  Filling ${stepName} with: ${value}`);
    await locator.fill(value);
    this.logger.info(`✅ Fill successful`);
    return this;
  }

  async getText(locator: Locator): Promise<string> {
    const text = await locator.textContent() || '';
    this.logger.info(`📖 Got text: ${text}`);
    return text;
  }

  async isVisible(locator: Locator): Promise<boolean> {
    try {
      const visible = await locator.isVisible();
      this.logger.info(`👁️  Visibility check: ${visible}`);
      return visible;
    } catch (e) {
      this.logger.warn(`⚠️  Element not found`);
      return false;
    }
  }

  async waitForVisible(locator: Locator, timeout: number = 5000): Promise<this> {
    this.logger.info(`⏳ Waiting for element (timeout: ${timeout}ms)`);
    await locator.waitFor({ timeout });
    this.logger.info(`✅ Element visible`);
    return this;
  }

  async waitForURLContains(value: string): Promise<this> {
    this.logger.info(`⏳ Waiting for URL to contain: ${value}`);
    await this.page.waitForURL(new RegExp(value));
    this.logger.info(`✅ URL updated`);
    return this;
  }

  async selectOption(locator: Locator, value: string): Promise<this> {
    this.logger.info(`📋 Selecting option: ${value}`);
    await locator.selectOption(value);
    this.logger.info(`✅ Selection complete`);
    return this;
  }

  async safePress(locator: Locator, key: string): Promise<this> {
    this.logger.info(`⌨️  Pressing key: ${key}`);
    await locator.press(key);
    this.logger.info(`✅ Key press complete`);
    return this;
  }

  async reload(): Promise<this> {
    this.logger.info(`🔄 Reloading page`);
    await this.page.reload();
    return this;
  }

  async goBack(): Promise<this> {
    this.logger.info(`⬅️  Going back`);
    await this.page.goBack();
    return this;
  }

  async goForward(): Promise<this> {
    this.logger.info(`➡️  Going forward`);
    await this.page.goForward();
    return this;
  }

  async takeScreenshot(name: string): Promise<Buffer> {
    this.logger.info(`📸 Taking screenshot: ${name}`);
    return await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  async wait(ms: number): Promise<this> {
    this.logger.info(`⏳ Waiting ${ms}ms`);
    await this.page.waitForTimeout(ms);
    return this;
  }

  async scrollToElement(selector: string): Promise<this> {
    this.logger.info(`📜 Scrolling to element: ${selector}`);
    await this.page.locator(selector).scrollIntoViewIfNeeded();
    return this;
  }

  async scrollToTop(): Promise<this> {
    this.logger.info(`📜 Scrolling to top`);
    await this.page.evaluate(() => window.scrollTo(0, 0));
    return this;
  }

  async scrollToBottom(): Promise<this> {
    this.logger.info(`📜 Scrolling to bottom`);
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    return this;
  }
}
