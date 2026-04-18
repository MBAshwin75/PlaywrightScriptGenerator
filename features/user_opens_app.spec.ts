import { test, expect } from '@playwright/test';
import { Page } from './pages/Page';

describe('User flow: open app, login, dashboard', () => {
  test('Given user opens app, When clicking login, Then redirected to dashboard', async ({ page }) => {
    const pageObj = new Page(page);
    // Given user opens app
    await pageObj.goto('/');
    // When clicking login
    await pageObj.click('text=Login');
    // Then redirected to dashboard
    await expect(page).toHaveURL(/dashboard/);
  });
});