import { test, expect } from '@playwright/test';

test('Google search test', async ({ page }) => {
  await page.goto('https://www.google.com');

  await page.fill('.gLFyf', 'Playwright');
  await page.press('.gLFyf', 'Enter');

  await expect(page).toHaveURL(/search/);
});