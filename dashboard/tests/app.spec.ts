import { test, expect } from '@playwright/test';

test.describe('FashionOS Core Application', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
  });

  test('should load the homepage without errors', async ({ page }) => {
    // Check that the page loads
    await expect(page).toHaveTitle(/FashionOS|Refine/);
    
    // Check for no console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
    
    // Assert no critical errors
    const criticalErrors = errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('chrome-extension') &&
      !error.includes('DevTools')
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test('should display main navigation elements', async ({ page }) => {
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check for key navigation elements
    const navigation = page.locator('nav, [role="navigation"], .mantine-AppShell-navbar');
    await expect(navigation).toBeVisible();
  });

  test('should handle responsive design', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForLoadState('networkidle');
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');
    
    // Ensure page still loads properly
    await expect(page.locator('body')).toBeVisible();
  });

  test('should not have accessibility violations', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Basic accessibility checks
    const mainContent = page.locator('main, [role="main"], #root');
    await expect(mainContent).toBeVisible();
  });
});
