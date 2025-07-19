import { test, expect, Page } from '@playwright/test';

// Real-world example: Complete order processing automation
export class OrderAutomation {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async processNewOrder(orderData: any) {
    // Navigate to orders
    await this.page.goto('/orders/new');
    
    // Fill customer details
    await this.page.fill('#customer-email', orderData.email);
    await this.page.fill('#customer-name', orderData.name);
    
    // Add products
    for (const product of orderData.products) {
      await this.page.click('[data-testid="add-product"]');
      await this.page.fill('[data-testid="product-search"]', product.sku);
      await this.page.click(`[data-testid="product-${product.sku}"]`);
      await this.page.fill('[data-testid="quantity"]', product.quantity.toString());
    }
    
    // Apply discount if any
    if (orderData.discount) {
      await this.page.fill('#discount-code', orderData.discount);
      await this.page.click('[data-testid="apply-discount"]');
    }
    
    // Submit order
    await this.page.click('[data-testid="submit-order"]');
    
    // Wait for confirmation
    await expect(this.page.locator('.order-success')).toBeVisible();
    
    // Get order number
    const orderNumber = await this.page.textContent('[data-testid="order-number"]');
    return orderNumber;
  }
}

// Test implementation
test('Process Black Friday bulk orders', async ({ page }) => {
  const automation = new OrderAutomation(page);
  
  // Sample bulk order data
  const orders = [
    {
      email: 'customer1@test.com',
      name: 'John Doe',
      products: [
        { sku: 'SHIRT-001', quantity: 2 },
        { sku: 'PANTS-001', quantity: 1 }
      ],
      discount: 'BLACKFRIDAY30'
    },
    // Add more orders...
  ];
  
  const results = [];
  for (const order of orders) {
    const orderNumber = await automation.processNewOrder(order);
    results.push({ ...order, orderNumber });
  }
  
  // Generate report
  console.table(results);
});
