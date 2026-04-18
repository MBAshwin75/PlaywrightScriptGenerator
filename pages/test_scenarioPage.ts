import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger/Logger';

/**
 * test_scenarioPage - Page Object Model for scenario-specific actions
 * 
 * Extends BasePage to inherit all common Playwright interactions:
 * - navigate(path) - Navigate to URL with logging
 * - clickElement(locator, stepName) - Click with smart wait
 * - fillElement(locator, value, stepName) - Fill input with logging
 * - getText(locator) - Get element text
 * - isVisible(locator) - Check if visible (no throw)
 * - waitForVisible(locator, timeout) - Wait for element
 * - waitForURLContains(value) - Wait for URL match
 * - selectOption(locator, value) - Select dropdown option
 * - safePress(locator, key) - Press key on element
 * 
 * This class adds SCENARIO-SPECIFIC methods that wrap inherited methods
 * with domain-specific logic specific to the test case.
 */
export class test_scenarioPage extends BasePage {
  // Define selectors as properties for reusability
  private readonly navigate_to_ecommerce_playgroundSelector = this.page.locator('https://ecommerce-playground.lambdatest.io');
  private readonly click_shop_by_categorySelector = this.page.locator('text=Shop by Category');
  private readonly click_cameras_categorySelector = this.page.locator('text=Cameras');
  private readonly select_canon_e_o_s5dSelector = this.page.locator('text=canon EOS 5d');

  constructor(page: Page, logger: Logger) {
    super(page, logger);
  }

  // ============================================================
  // NAVIGATION & PAGE STATE
  // ============================================================

  /**
   * Opens the eCommerce Playground home page
   * Uses inherited navigate() method
   */
  async navigateToEcommercePlayground(): Promise<test_scenarioPage> {
    await this.navigate('https://ecommerce-playground.lambdatest.io');
    // Wait for page content to load
    await this.waitForVisible(this.page.locator('body'), 10000);
    return this;
  }

  /**
   * Clicks the 'Shop by Category' link on the homepage
   * Uses inherited clickElement() method
   */
  async clickShopByCategory(): Promise<test_scenarioPage> {
    const locator = this.page.locator('text=Shop by Category');
    await this.clickElement(locator, 'clickShopByCategory');
    return this;
  }

  // ============================================================
  // ACTIONS
  // ============================================================

  /**
   * Selects the 'Cameras' category from the category list
   * Uses inherited clickElement() method
   */
  async clickCamerasCategory(): Promise<test_scenarioPage> {
    const locator = this.page.locator('text=Cameras');
    await this.clickElement(locator, 'clickCamerasCategory');
    return this;
  }

  /**
   * Clicks on the product 'canon EOS 5d' to view its details
   * Uses inherited clickElement() method
   */
  async selectCanonEOS5d(): Promise<test_scenarioPage> {
    const locator = this.page.locator('text=canon EOS 5d');
    await this.clickElement(locator, 'selectCanonEOS5d');
    return this;
  }

}
