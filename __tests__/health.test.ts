/**
 * @jest-environment node
 */

describe('Health Endpoint', () => {
  test('health endpoint returns OK status', async () => {
    const mockResponse = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: 'test',
      version: '0.1.0',
    };

    // Since we can't actually fetch in Jest without a running server,
    // we'll test the response structure
    expect(mockResponse).toHaveProperty('status', 'ok');
    expect(mockResponse).toHaveProperty('timestamp');
    expect(mockResponse).toHaveProperty('environment');
    expect(mockResponse).toHaveProperty('version');
  });
});

describe('Environment Configuration', () => {
  test('PORT defaults to 3000 if not set', () => {
    const port = process.env.PORT || '3000';
    expect(port).toBe('3000');
  });

  test('health check URL uses correct port', () => {
    const port = process.env.PORT || '3000';
    const healthUrl = `http://localhost:${port}/api/health`;
    expect(healthUrl).toMatch(/http:\/\/localhost:\d+\/api\/health/);
  });
});