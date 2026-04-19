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
  private readonly navigate_to_applicationSelector = this.page.locator('https://ecommerce-playground.lambdatest.io');
  private readonly click_shop_by_categorySelector = this.page.locator('Shop by Category');
  private readonly click_cameras_categorySelector = this.page.locator('Cameras');
  private readonly click_canon_e_o_s5d_productSelector = this.page.locator('canon EOS 5d');

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
  async navigateToApplication(): Promise<test_scenarioPage> {
    await this.navigate('https://ecommerce-playground.lambdatest.io');
    // Wait for page content to load
    await this.waitForVisible(this.page.locator('body'), 10000);
    return this;
  }

  // ============================================================
  // ACTIONS
  // ============================================================

  /**
   * Open the 'Shop by Category' navigation panel
   * Uses inherited clickElement() method
   */
  async clickShopByCategory1(): Promise<test_scenarioPage> {
    const locator = this.page.locator('Shop by Category');
    await this.clickElement(locator, 'clickShopByCategory');
    return this;
  }

  /**
   * Select the 'Cameras' category from the list
   * Uses inherited clickElement() method
   */
  async clickCamerasCategory(): Promise<test_scenarioPage> {
    const locator = this.page.locator('Cameras');
    await this.clickElement(locator, 'clickCamerasCategory');
    return this;
  }

  /**
   * Open the product page for 'canon EOS 5d'
   * Uses inherited clickElement() method
   */
  async clickCanonEOS5dProduct(): Promise<test_scenarioPage> {
    const locator = this.page.locator('canon EOS 5d');
    await this.clickElement(locator, 'clickCanonEOS5dProduct');
    return this;
  }

}
