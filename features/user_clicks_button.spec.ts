import { test, expect } from '@playwright/test';
import { Page } from './pages/Page';

describe('user clicks button', () => {
  test('user clicks button', async ({ page: p }) => {
    const pageObj = new Page(p);
    // Given user clicks button
    await pageObj.click('button');

    // When page loads
    await p.waitForLoadState('load');

    // Then success message shows
    await expect(p.locator('text=Success')).toBeVisible();
  });
});