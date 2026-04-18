import { test, expect } from '@playwright/test';
import { test_scenarioPage } from '../pages/test_scenarioPage';

describe('Test Scenario', () => {
  test('Test Scenario', async ({ page }) => {
    const test_scenarioPage = new test_scenarioPage(page);

    // Step 1: Opens the eCommerce Playground home page
    await test_scenarioPage.navigateToEcommercePlayground();
    // Step 2: Clicks the 'Shop by Category' link on the homepage
    await test_scenarioPage.clickShopByCategory();
    // Step 3: Selects the 'Cameras' category from the category list
    await test_scenarioPage.clickCamerasCategory();
    // Step 4: Clicks on the product 'canon EOS 5d' to view its details
    await test_scenarioPage.selectCanonEOS5d();
  });
});
