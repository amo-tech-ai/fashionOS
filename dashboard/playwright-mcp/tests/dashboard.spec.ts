import { test, expect } from '@playwright/test';

// Test configuration for FashionOS Dashboard
test.use({
  baseURL: 'http://localhost:4572',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'retain-on-failure'
});

// Critical Path Tests
test.describe('Dashboard Health Checks', () => {
  test('Dashboard loads without 500 errors', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('API endpoints respond correctly', async ({ request }) => {
    const apis = [
      '/api/health',
      '/api/products',
      '/api/orders'
    ];
    
    for (const endpoint of apis) {
      const response = await request.get(endpoint);
      expect(response.status()).toBeLessThan(400);
    }
  });
});

// Revenue Impact Tests
test.describe('Revenue Critical Paths', () => {
  test('Product creation flow', async ({ page }) => {
    await page.goto('/products/new');
    
    // Fill product form
    await page.fill('[name="title"]', 'Test Product');
    await page.fill('[name="price"]', '99.99');
    await page.selectOption('[name="category"]', 'fashion');
    
    // Submit and verify
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/products\/\d+/);
  });

  test('Order processing flow', async ({ page }) => {
    await page.goto('/orders');
    
    // Check order list loads
    await expect(page.locator('.order-row')).toHaveCount(10);
    
    // Process first order
    await page.click('.order-row:first-child .process-btn');
    await expect(page.locator('.success-toast')).toBeVisible();
  });
});
