import { test, expect } from '@playwright/test';

test.describe('Responsive Layout', () => {
  const viewports = [
    { name: 'Mobile', width: 320, height: 568 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1440, height: 900 }
  ];

  viewports.forEach(({ name, width, height }) => {
    test(`should be responsive at ${name} (${width}x${height})`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      
      // Login
      await page.goto('/login');
      await page.fill('input[name="email"]', 'demo@refine.dev');
      await page.fill('input[name="password"]', 'demodemo');
      await page.click('button[type="submit"]');
      await page.waitForURL('/');
      
      // Check dashboard renders properly
      await expect(page.locator('text=Fashion Events Dashboard')).toBeVisible();
      
      if (width < 768) {
        // Mobile: Check hamburger menu
        await expect(page.locator('button[aria-label="Toggle navigation"]')).toBeVisible();
        
        // Open mobile menu
        await page.click('button[aria-label="Toggle navigation"]');
        await expect(page.locator('nav')).toBeVisible();
      } else {
        // Desktop: Check sidebar is visible
        await expect(page.locator('nav')).toBeVisible();
      }
      
      // Navigate to events
      if (width < 768) {
        await page.click('a:has-text("Events")');
      } else {
        await page.click('nav a:has-text("Events")');
      }
      
      await page.waitForURL('/events');
      
      // Check table is scrollable on mobile
      if (width < 768) {
        const scrollArea = page.locator('.mantine-ScrollArea-root');
        await expect(scrollArea).toBeVisible();
      }
      
      // Check cards/grid layout adapts
      const grid = page.locator('.mantine-Grid-root');
      if (await grid.count() > 0) {
        const gridCols = await grid.evaluate(el => 
          window.getComputedStyle(el).gridTemplateColumns
        );
        
        if (width < 768) {
          // Should be single column on mobile
          expect(gridCols).toContain('1fr');
        }
      }
    });
  });

  test('should hide/show elements based on viewport', async ({ page }) => {
    // Desktop view
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    
    // Sidebar should be visible on desktop
    const sidebar = page.locator('aside, nav[role="navigation"]').first();
    await expect(sidebar).toBeVisible();
    
    // Mobile view
    await page.setViewportSize({ width: 320, height: 568 });
    
    // Sidebar should be hidden, hamburger visible
    await expect(page.locator('button[aria-label="Toggle navigation"]')).toBeVisible();
  });
});
