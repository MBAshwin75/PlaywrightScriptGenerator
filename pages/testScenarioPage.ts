import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger/Logger';

/**
 * testScenarioPage - Page Object Model for scenario-specific actions
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
export class testScenarioPage extends BasePage {
  // Define selectors as properties for reusability
  private readonly navigate_to_applicationSelector = this.page.locator('https://ecommerce-playground.lambdatest.io');
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
   * Navigate to the e‑commerce playground home page
   * Uses inherited navigate() method
   */
  async navigateToApplication(): Promise<testScenarioPage> {
    await this.navigate('https://ecommerce-playground.lambdatest.io');
    // Wait for page content to load
    await this.waitForVisible(this.page.locator('body'), 10000);
    return this;
  }

  // ============================================================
  // ACTIONS
  // ============================================================

  /**
   * Open the "Shop by Category" dropdown/menu
   * Uses inherited clickElement() method
   */
  async clickShopByCategory(): Promise<testScenarioPage> {
    const locator = this.page.locator('text=Shop by Category');
    await this.clickElement(locator, 'clickShopByCategory');
    return this;
  }

  /**
   * Select the "Cameras" category from the list
   * Uses inherited clickElement() method
   */
  async clickCamerasCategory(): Promise<testScenarioPage> {
    const locator = this.page.locator('text=Cameras');
    await this.clickElement(locator, 'clickCamerasCategory');
    return this;
  }

  /**
   * Choose the product "canon EOS 5d"
   * Uses inherited clickElement() method
   */
  async selectCanonEOS5d(): Promise<testScenarioPage> {
    const locator = this.page.locator('text=canon EOS 5d');
    await this.clickElement(locator, 'selectCanonEOS5d');
    return this;
  }

}
