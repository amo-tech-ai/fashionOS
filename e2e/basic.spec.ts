import { test, expect } from '@playwright/test';

test.describe('FashionOS E2E Tests', () => {
  test('health check endpoint returns OK', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.status).toBe('ok');
    expect(data.services.database.status).toBe('healthy');
  });

  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/FashionOS/);
    
    // Check for main dashboard elements
    await expect(page.locator('text=Dashboard')).toBeVisible();
    await expect(page.locator('text=Events')).toBeVisible();
  });

  test('navigation menu is accessible', async ({ page }) => {
    await page.goto('/');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check ARIA attributes
    const menuItems = await page.locator('[role="menuitem"]').count();
    expect(menuItems).toBeGreaterThan(0);
  });

  test('event creation flow', async ({ page }) => {
    await page.goto('/events/create');
    
    // Fill form
    await page.fill('input[name="title"]', 'Test Fashion Show');
    await page.fill('textarea[name="description"]', 'E2E test event');
    await page.selectOption('select[name="event_type"]', 'runway');
    
    // Test form validation
    await page.click('button:has-text("Next Step")');
    
    // Verify validation messages appear for required fields
    await expect(page.locator('text=required')).toBeVisible();
  });

  test('responsive sidebar collapse', async ({ page }) => {
    await page.goto('/');
    
    // Find collapse button
    const collapseButton = page.locator('button[aria-label*="collapse"]');
    await collapseButton.click();
    
    // Verify sidebar state changed
    await page.waitForTimeout(300); // Wait for animation
    
    // Check localStorage
    const collapsed = await page.evaluate(() => 
      localStorage.getItem('fashionos-sidebar-collapsed')
    );
    expect(collapsed).toBe('true');
  });
});