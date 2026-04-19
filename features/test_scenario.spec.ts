import { test, expect } from '@playwright/test';
import { test_scenarioPage } from '../pages/test_scenarioPage';
import { Logger } from '../utils/logger/Logger';

describe('Test Scenario', () => {
  test('Test Scenario', async ({ page }) => {
    const logger = new Logger('Test Scenario');
    const test_scenarioPage = new test_scenarioPage(page, logger);

    // Step 1: Navigate to the e‑commerce playground homepage
    await test_scenarioPage.launchApplication();
    // Step 2: Open the “Shop by Category” menu
    await test_scenarioPage.clickShopByCategory();
    // Step 3: Select the “Cameras” category from the menu
    await test_scenarioPage.clickCamerasCategory();
    // Step 4: Choose the product “canon EOS 5d”
    await test_scenarioPage.selectCanonEOS5d();
  });
});
