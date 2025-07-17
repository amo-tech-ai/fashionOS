import { test, expect } from '@playwright/test';

test.describe('Event CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('input[name="email"]', 'demo@refine.dev');
    await page.fill('input[name="password"]', 'demodemo');
    await page.click('button[type="submit"]');
    await page.waitForURL('/');
  });

  test('should navigate to events list', async ({ page }) => {
    await page.goto('/events');
    await expect(page.locator('text=Fashion Events')).toBeVisible();
    await expect(page.locator('table')).toBeVisible();
  });

  test('should create a new event', async ({ page }) => {
    await page.goto('/events');
    
    // Click create button
    await page.click('button:has-text("Create Event")');
    await page.waitForURL('/events/create');
    
    // Fill event form
    await page.fill('input[name="title"]', 'Test Fashion Show');
    await page.fill('textarea[name="description"]', 'Test event description');
    await page.fill('input[name="event_date"]', '2024-12-25');
    await page.fill('input[name="start_time"]', '18:00');
    await page.fill('input[name="target_attendance"]', '200');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Should redirect to events list
    await page.waitForURL('/events', { timeout: 10000 });
    
    // Check if new event appears in list
    await expect(page.locator('text=Test Fashion Show')).toBeVisible();
  });
  test('should edit an existing event', async ({ page }) => {
    await page.goto('/events');
    
    // Click edit on first event
    await page.locator('button[aria-label="Edit"]').first().click();
    
    // Wait for edit page
    await expect(page.locator('text=Edit Event')).toBeVisible();
    
    // Update title
    const titleInput = page.locator('input[name="title"]');
    await titleInput.clear();
    await titleInput.fill('Updated Fashion Show');
    
    // Save changes
    await page.click('button[type="submit"]');
    
    // Should redirect back to list
    await page.waitForURL('/events');
    
    // Check if updated title appears
    await expect(page.locator('text=Updated Fashion Show')).toBeVisible();
  });

  test('should cancel event creation', async ({ page }) => {
    await page.goto('/events/create');
    
    // Fill some data
    await page.fill('input[name="title"]', 'Cancelled Event');
    
    // Click cancel button
    await page.click('button:has-text("Cancel")');
    
    // Should redirect to events list without creating
    await page.waitForURL('/events');
    
    // Event should not appear in list
    await expect(page.locator('text=Cancelled Event')).not.toBeVisible();
  });

  test('should delete an event', async ({ page }) => {
    await page.goto('/events');
    
    // Get initial event count
    const initialCount = await page.locator('table tbody tr').count();
    
    // Click delete on first event
    await page.locator('button[aria-label="Delete"]').first().click();
    
    // Confirm deletion in dialog
    await page.click('button:has-text("Delete")');
    
    // Wait for deletion to complete
    await page.waitForTimeout(1000);
    
    // Check event count decreased
    const newCount = await page.locator('table tbody tr').count();
    expect(newCount).toBe(initialCount - 1);
  });
});
