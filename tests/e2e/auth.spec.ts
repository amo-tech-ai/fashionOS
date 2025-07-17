import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should show login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/FashionOS/);
    await expect(page.locator('text=Sign in')).toBeVisible();
  });

  test('should handle invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    // Fill in invalid credentials
    await page.fill('input[name="email"]', 'invalid@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    // Check for error message
    await expect(page.locator('text=Invalid email or password')).toBeVisible({ timeout: 10000 });
  });

  test('should login with valid credentials and redirect to dashboard', async ({ page }) => {
    await page.goto('/login');
    
    // Fill in valid credentials (using demo credentials)
    await page.fill('input[name="email"]', 'demo@refine.dev');
    await page.fill('input[name="password"]', 'demodemo');
    await page.click('button[type="submit"]');
    
    // Wait for redirect to dashboard
    await page.waitForURL('/', { timeout: 10000 });
    await expect(page.locator('text=Fashion Events Dashboard')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // First login
    await page.goto('/login');
    await page.fill('input[name="email"]', 'demo@refine.dev');
    await page.fill('input[name="password"]', 'demodemo');
    await page.click('button[type="submit"]');
    await page.waitForURL('/');
    
    // Find and click logout button
    await page.click('button:has-text("Logout")');
    
    // Should redirect to login
    await expect(page).toHaveURL('/login');
  });
});
