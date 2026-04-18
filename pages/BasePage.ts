import { Page, Locator } from '@playwright/test';

/**
 * BasePage - Base class for all Page Objects
 * Provides common methods for interacting with web elements
 * All page objects should extend this class
 */
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<this> {
    await this.page.goto(url, { waitUntil: 'load' });
    return this;
  }

  async clickElement(selector: string): Promise<this> {
    await this.page.click(selector);
    return this;
  }

  async fillText(selector: string, value: string): Promise<this> {
    await this.page.fill(selector, value);
    return this;
  }

  async selectOption(selector: string, value: string): Promise<this> {
    await this.page.selectOption(selector, value);
    return this;
  }

  async doubleClickElement(selector: string): Promise<this> {
    await this.page.dblclick(selector);
    return this;
  }

  async pressKey(key: string): Promise<this> {
    await this.page.press('body', key);
    return this;
  }

  async waitForElement(selector: string, timeout: number = 30000): Promise<Locator> {
    const locator = this.page.locator(selector);
    await locator.waitFor({ timeout });
    return locator;
  }

  getElement(selector: string): Locator {
    return this.page.locator(selector);
  }

  async getElementText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  async isElementPresent(selector: string): Promise<boolean> {
    const count = await this.page.locator(selector).count();
    return count > 0;
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async waitForNavigation(): Promise<void> {
    await this.page.waitForLoadState('load');
  }

  async reloadPage(): Promise<this> {
    await this.page.reload();
    return this;
  }

  async goBack(): Promise<this> {
    await this.page.goBack();
    return this;
  }

  async goForward(): Promise<this> {
    await this.page.goForward();
    return this;
  }

  async takeScreenshot(name: string): Promise<Buffer> {
    return await this.page.screenshot({ path: 'screenshots/' + name + '.png' });
  }

  async wait(ms: number): Promise<this> {
    await this.page.waitForTimeout(ms);
    return this;
  }

  async scrollToElement(selector: string): Promise<this> {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
    return this;
  }

  async scrollToTop(): Promise<this> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    return this;
  }

  async scrollToBottom(): Promise<this> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    return this;
  }
}
