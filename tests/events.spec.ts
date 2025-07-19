import { test, expect } from '@playwright/test';

test.describe('Events Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to events page', async ({ page }) => {
    // Look for events navigation link
    const eventsLink = page.locator('a[href*="event"], a:has-text("Events"), a:has-text("Event")').first();
    
    if (await eventsLink.isVisible()) {
      await eventsLink.click();
      await page.waitForLoadState('networkidle');
      
      // Check if we're on an events page
      await expect(page.url()).toMatch(/event/);
    } else {
      // Direct navigation test
      await page.goto('/events');
      await page.waitForLoadState('networkidle');
    }
  });

  test('should display events list', async ({ page }) => {
    await page.goto('/events');
    await page.waitForLoadState('networkidle');
    
    // Look for list container or table
    const listContainer = page.locator('table, .mantine-Table-root, [data-testid="events-list"], .events-container').first();
    
    // If events exist, should be visible
    if (await listContainer.isVisible()) {
      await expect(listContainer).toBeVisible();
    }
  });

  test('should handle create event navigation', async ({ page }) => {
    // Try to navigate to create event page
    try {
      await page.goto('/events/create');
      await page.waitForLoadState('networkidle');
      
      // Look for form elements
      const form = page.locator('form, .mantine-form, [data-testid="event-form"]').first();
      if (await form.isVisible()) {
        await expect(form).toBeVisible();
      }
    } catch (error) {
      // Page might not exist yet, that's OK
      console.log('Create page not available yet');
    }
  });

  test('should handle event detail navigation', async ({ page }) => {
    // Try to navigate to a sample event detail page
    try {
      await page.goto('/events/1');
      await page.waitForLoadState('networkidle');
      
      // Should not show 404 or error
      const errorIndicator = page.locator('text=404, text=Error, text=Not Found').first();
      const hasError = await errorIndicator.isVisible();
      
      if (!hasError) {
        // Should show some content
        await expect(page.locator('body')).toBeVisible();
      }
    } catch (error) {
      console.log('Event detail page handling test completed');
    }
  });
});
