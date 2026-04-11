import { expect, type Locator } from '@playwright/test';

/**
 * Assertion helper wrapping Playwright's expect API.
 * Provides consistent assertion patterns for page objects and tests.
 */
export class AssertionHelper {
  /** Assert that the locator is visible on the page */
  static async assertVisible(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeVisible();
  }

  /** Assert that the locator is hidden or not present */
  static async assertHidden(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeHidden();
  }

  /** Assert that the locator contains the expected text */
  static async assertContainsText(
    locator: Locator,
    expectedText: string,
    message?: string,
  ): Promise<void> {
    await expect(locator, message).toContainText(expectedText);
  }

  /** Assert that the locator has exactly the expected text */
  static async assertHasText(
    locator: Locator,
    expectedText: string,
    message?: string,
  ): Promise<void> {
    await expect(locator, message).toHaveText(expectedText);
  }

  /** Assert that the locator has the expected attribute value */
  static async assertHasAttribute(
    locator: Locator,
    attribute: string,
    value: string | RegExp,
    message?: string,
  ): Promise<void> {
    await expect(locator, message).toHaveAttribute(attribute, value);
  }

  /** Assert that the locator is enabled */
  static async assertEnabled(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeEnabled();
  }

  /** Assert that the locator is disabled */
  static async assertDisabled(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeDisabled();
  }

  /** Assert that the locator has a specific value (input fields) */
  static async assertHasValue(
    locator: Locator,
    value: string,
    message?: string,
  ): Promise<void> {
    await expect(locator, message).toHaveValue(value);
  }

  /** Assert current URL contains the expected substring */
  static async assertURLContains(
    page: { url(): string },
    substring: string,
    message?: string,
  ): Promise<void> {
    expect(page.url(), message).toContain(substring);
  }

  /** Assert element count */
  static async assertCount(
    locator: Locator,
    expectedCount: number,
    message?: string,
  ): Promise<void> {
    await expect(locator, message).toHaveCount(expectedCount);
  }
}
