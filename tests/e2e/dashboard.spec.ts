import { test, expect } from '@playwright/test';

test.describe('Dashboard Rendering & Theming', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('input[name="email"]', 'demo@refine.dev');
    await page.fill('input[name="password"]', 'demodemo');
    await page.click('button[type="submit"]');
    await page.waitForURL('/');
  });

  test('should render dashboard with all components', async ({ page }) => {
    // Check main dashboard elements
    await expect(page.locator('text=Fashion Events Dashboard')).toBeVisible();
    await expect(page.locator('text=Total Events')).toBeVisible();
    await expect(page.locator('text=Expected Attendance')).toBeVisible();
    await expect(page.locator('text=Revenue Potential')).toBeVisible();
    await expect(page.locator('text=Active Venues')).toBeVisible();
    
    // Check for charts
    await expect(page.locator('text=Event Activity Trends')).toBeVisible();
    
    // Check for quick actions
    await expect(page.locator('text=Quick Actions')).toBeVisible();
    await expect(page.locator('text=Create Event')).toBeVisible();
  });

  test('should not have console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    expect(consoleErrors).toHaveLength(0);
  });

  test('should apply fashion theme colors', async ({ page }) => {
    // Check if primary color is applied
    const primaryButton = page.locator('button').filter({ hasText: 'Create Event' }).first();
    await expect(primaryButton).toBeVisible();
    
    // Check theme colors in CSS
    const buttonColor = await primaryButton.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    // Should have some color applied (not transparent or white)
    expect(buttonColor).not.toBe('transparent');
    expect(buttonColor).not.toBe('rgb(255, 255, 255)');
  });

  test('should render charts without errors', async ({ page }) => {
    // Wait for charts to render
    await page.waitForSelector('svg', { timeout: 10000 });
    
    // Check if SVG elements are present (charts)
    const charts = await page.locator('svg').count();
    expect(charts).toBeGreaterThan(0);
  });
});
