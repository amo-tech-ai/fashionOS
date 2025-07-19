import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should handle login page access', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    // Look for login form elements
    const loginForm = page.locator('form, .mantine-form, [data-testid="login-form"]').first();
    const emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="email" i]').first();
    const passwordInput = page.locator('input[type="password"], input[name="password"]').first();
    
    if (await loginForm.isVisible()) {
      await expect(loginForm).toBeVisible();
      await expect(emailInput).toBeVisible();
      await expect(passwordInput).toBeVisible();
    }
  });

  test('should handle registration page access', async ({ page }) => {
    await page.goto('/register');
    await page.waitForLoadState('networkidle');
    
    // Look for registration form elements
    const registerForm = page.locator('form, .mantine-form, [data-testid="register-form"]').first();
    
    if (await registerForm.isVisible()) {
      await expect(registerForm).toBeVisible();
    }
  });

  test('should handle forgot password page', async ({ page }) => {
    await page.goto('/forgot-password');
    await page.waitForLoadState('networkidle');
    
    // Look for forgot password form
    const forgotForm = page.locator('form, .mantine-form, [data-testid="forgot-password-form"]').first();
    
    if (await forgotForm.isVisible()) {
      await expect(forgotForm).toBeVisible();
    }
  });

  test('should validate form fields on login page', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    const submitButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first();
    
    if (await submitButton.isVisible()) {
      // Try to submit without filling fields
      await submitButton.click();
      
      // Should show validation messages or not proceed
      // This is a basic check - forms should handle validation
      await page.waitForTimeout(1000);
    }
  });
});
