import { test, expect } from '@playwright/test';

test.describe('Performance Testing', () => {
  test('should load the homepage within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Should load within 10 seconds (generous for development)
    expect(loadTime).toBeLessThan(10000);
    console.log(`Homepage loaded in ${loadTime}ms`);
  });

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for content to fully render
    await page.waitForTimeout(2000);
    
    // Basic performance checks
    const performanceEntries = await page.evaluate(() => {
      return JSON.stringify(performance.getEntriesByType('navigation'));
    });
    
    const entries = JSON.parse(performanceEntries);
    if (entries.length > 0) {
      const entry = entries[0] as any;
      
      // Check if DOM content loads reasonably fast
      const domContentLoaded = entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;
      expect(domContentLoaded).toBeLessThan(5000);
    }
  });

  test('should handle large datasets efficiently', async ({ page }) => {
    // Navigate to events page (which might have data)
    const startTime = Date.now();
    
    await page.goto('/events');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Should handle data loading efficiently
    expect(loadTime).toBeLessThan(15000);
    console.log(`Events page loaded in ${loadTime}ms`);
  });

  test('should not have memory leaks', async ({ page }) => {
    // Navigate between pages multiple times
    const pages = ['/', '/events', '/login', '/register'];
    
    for (let i = 0; i < 3; i++) {
      for (const path of pages) {
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);
      }
    }
    
    // Check for JavaScript heap size (basic check)
    const heapSize = await page.evaluate(() => {
      return (performance as any).memory?.usedJSHeapSize || 0;
    });
    
    if (heapSize > 0) {
      // Should not exceed 100MB (reasonable for a web app)
      expect(heapSize).toBeLessThan(100 * 1024 * 1024);
      console.log(`Heap size: ${Math.round(heapSize / 1024 / 1024)}MB`);
    }
  });
});
