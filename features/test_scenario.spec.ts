import { test, expect } from '@playwright/test';
import { test_scenarioPage } from '../pages/test_scenarioPage';

describe('Test Scenario', () => {
  test('Test Scenario', async ({ page }) => {
    const test_scenarioPage = new test_scenarioPage(page);

    // Step 1: Navigate to the e‑commerce playground home page
    await test_scenarioPage.openEcommerceSite();
    // Step 2: Open the "Shop by Category" dropdown/menu
    await test_scenarioPage.clickShopByCategory();
    // Step 3: Select the "Cameras" category from the list
    await test_scenarioPage.clickCamerasCategory();
    // Step 4: Choose the product "canon EOS 5d"
    await test_scenarioPage.selectCanonEOS5d();
  });
});
