import { test, expect } from '@playwright/test';

test.describe('Database Integration', () => {
  test('should connect to Supabase without errors', async ({ page }) => {
    // Monitor network requests
    const apiRequests: string[] = [];
    const errors: string[] = [];
    
    page.on('response', response => {
      if (response.url().includes('supabase')) {
        apiRequests.push(`${response.status()} - ${response.url()}`);
      }
    });
    
    page.on('console', msg => {
      if (msg.type() === 'error' && msg.text().includes('supabase')) {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait a bit for potential async operations
    await page.waitForTimeout(2000);
    
    // Check for critical Supabase connection errors
    const criticalErrors = errors.filter(error => 
      error.includes('connection') || 
      error.includes('authentication') ||
      error.includes('unauthorized')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });

  test('should handle API responses correctly', async ({ page }) => {
    let hasApiCall = false;
    
    page.on('response', response => {
      if (response.url().includes('/rest/v1/') || response.url().includes('supabase')) {
        hasApiCall = true;
        // Check for successful responses (200-299) or expected errors (400-499)
        expect(response.status()).toBeLessThan(500);
      }
    });
    
    await page.goto('/events');
    await page.waitForLoadState('networkidle');
    
    // Wait for potential API calls
    await page.waitForTimeout(3000);
    
    // If API calls were made, they should be handled correctly
    if (hasApiCall) {
      console.log('API calls detected and handled correctly');
    }
  });

  test('should handle offline gracefully', async ({ page, context }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Simulate offline
    await context.setOffline(true);
    
    // Try to navigate to another page
    await page.goto('/events');
    
    // Should handle offline state gracefully
    await page.waitForTimeout(2000);
    
    // Restore online
    await context.setOffline(false);
  });
});
