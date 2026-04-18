import { test, expect } from '@playwright/test';
import { testScenarioPage } from '../pages/testScenarioPage';

describe('Test Scenario', () => {
  test('Test Scenario', async ({ page }) => {
    const testScenarioPage = new testScenarioPage(page);

    // Step 1: Navigate to the e‑commerce playground home page
    await testScenarioPage.navigateToApplication();
    // Step 2: Open the "Shop by Category" dropdown/menu
    await testScenarioPage.clickShopByCategory();
    // Step 3: Select the "Cameras" category from the list
    await testScenarioPage.clickCamerasCategory();
    // Step 4: Choose the product "canon EOS 5d"
    await testScenarioPage.selectCanonEOS5d();
  });
});
