import { test, expect } from '@playwright/test';

test.describe('Health API', () => {
  test('GET /api/health returns 200 OK with correct structure', async ({ request }) => {
    // Make a GET request to the health endpoint
    const response = await request.get('/api/health');

    // Check status code
    expect(response.status()).toBe(200);

    // Parse the response body
    const body = await response.json();

    // Check response structure
    expect(body).toHaveProperty('status', 'ok');
    expect(body).toHaveProperty('timestamp');
    expect(body).toHaveProperty('version');

    // Validate timestamp is a valid ISO date string
    const timestamp = new Date(body.timestamp);
    expect(timestamp.toString()).not.toBe('Invalid Date');

    // Validate version is a string in semver format (x.y.z)
    expect(typeof body.version).toBe('string');
    expect(body.version).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
