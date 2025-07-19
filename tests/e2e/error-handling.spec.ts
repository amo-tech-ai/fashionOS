import { test, expect } from '@playwright/test';

test.describe('Error Boundaries & Loading States', () => {
  test('should show loading states during data fetch', async ({ page }) => {
    // Slow down network to see loading states
    await page.route('**/*', route => {
      setTimeout(() => route.continue(), 1000);
    });
    
    await page.goto('/login');
    await page.fill('input[name="email"]', 'demo@refine.dev');
    await page.fill('input[name="password"]', 'demodemo');
    await page.click('button[type="submit"]');
    
    // Navigate to events
    await page.goto('/events');
    
    // Should show loading indicator
    await expect(page.locator('.mantine-Loader-root')).toBeVisible();
    
    // Wait for content to load
    await expect(page.locator('table')).toBeVisible({ timeout: 15000 });
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Intercept API calls and return error
    await page.route('**/api/**', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });
    
    await page.goto('/login');
    await page.fill('input[name="email"]', 'demo@refine.dev');
    await page.fill('input[name="password"]', 'demodemo');
    await page.click('button[type="submit"]');
    
    // Should show error message
    await expect(page.locator('text=Something went wrong')).toBeVisible({ timeout: 10000 });
  });

  test('should show skeleton loaders', async ({ page }) => {
    // Check for skeleton loaders during initial load
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Look for skeleton or loading elements
    const hasLoader = await page.locator('.mantine-Skeleton-root, .mantine-Loader-root').count();
    expect(hasLoader).toBeGreaterThan(0);
  });
});
