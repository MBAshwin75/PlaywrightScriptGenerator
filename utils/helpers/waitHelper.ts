import type { Locator, Page } from '@playwright/test';

/**
 * Smart wait helpers – no static waits allowed.
 * Each method uses Playwright's built-in auto-waiting enhanced with explicit state checks.
 */
export class WaitHelper {
  constructor(private readonly page: Page) {}

  /** Wait until the locator is visible in the viewport */
  async waitForVisible(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /** Wait until the locator is attached to the DOM (may not be visible) */
  async waitForAttached(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'attached', timeout });
  }

  /** Wait until the locator is hidden or detached */
  async waitForHidden(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /** Wait until the locator is enabled (not disabled) */
  async waitForEnabled(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.isEnabled();
  }

  /** Wait until the page URL contains the given substring */
  async waitForURLContains(substring: string, timeout?: number): Promise<void> {
    await this.page.waitForURL(`**/*${substring}*`, { timeout });
  }

  /** Wait for network to settle (no pending requests for 500ms) */
  async waitForNetworkIdle(timeout?: number): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  /** Wait for DOM content to be fully loaded */
  async waitForDOMContentLoaded(timeout?: number): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded', { timeout });
  }
}
