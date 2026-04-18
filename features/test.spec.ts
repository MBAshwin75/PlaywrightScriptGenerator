import { test, expect } from '@playwright/test';
import { Page } from './pages/Page';

describe('login flow', () => {
  test('should login successfully', async ({ page }) => {
    const pageObj = new Page(page);
    // Given test
    await page.goto('https://example.com'); // replace with actual URL
    // When login
    await pageObj.fill('#username', 'testuser');
    await pageObj.fill('#password', 'password123');
    await pageObj.click('#loginButton');
    // Then success
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('text=Welcome')).toBeVisible();
  });
});