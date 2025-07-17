import { test, expect } from '@playwright/test';

test.describe('Routing & SSR Hydration', () => {
  test('should load nested routes directly without errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('Failed to load resource')) {
        consoleErrors.push(msg.text());
      }
    });

    // Direct navigation to nested route
    await page.goto('/events/edit/1');
    
    // Should show login redirect or edit page
    const url = page.url();
    expect(url).toMatch(/\/(login|events\/edit\/1)/);
    
    // No hydration errors
    expect(consoleErrors.filter(e => e.includes('hydration'))).toHaveLength(0);
  });

  test('should handle 404 pages gracefully', async ({ page }) => {
    await page.goto('/non-existent-route');
    
    // Should show 404 or error component
    await expect(page.locator('text=404')).toBeVisible({ timeout: 10000 });
  });

  test('should maintain state during navigation', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[name="email"]', 'demo@refine.dev');
    await page.fill('input[name="password"]', 'demodemo');
    await page.click('button[type="submit"]');
    await page.waitForURL('/');
    
    // Navigate to events
    await page.click('a:has-text("Events")');
    await page.waitForURL('/events');
    
    // Navigate back to dashboard
    await page.click('a:has-text("Dashboard")');
    await page.waitForURL('/');
    
    // User should still be logged in
    await expect(page.locator('text=Fashion Events Dashboard')).toBeVisible();
  });
});
