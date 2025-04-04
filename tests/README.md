# Playwright Testing

This project uses Playwright for testing. There are three types of tests:

1. **Unit Tests**: For testing individual functions and components
2. **API Tests**: For testing API endpoints
3. **E2E Tests**: For testing the full application flow

## Getting Started

### Installation

Playwright is already installed as a dev dependency. If you need to reinstall it, run:

```bash
npm install --save-dev @playwright/test
npx playwright install
```

### Running Tests

To run all tests:

```bash
npm run test
```

To run specific test types:

```bash
# Run unit tests
npm run test:unit

# Run API tests
npm run test:api

# Run E2E tests
npm run test:e2e
```

To run tests in UI mode:

```bash
npm run test:ui
```

### Test Structure

- `tests/unit/`: Contains unit tests for individual functions and components
- `tests/api/`: Contains API tests for testing endpoints
- `tests/e2e/`: Contains end-to-end tests for testing the full application flow

## Writing Tests

### Unit Tests

Unit tests are used to test individual functions and components. Example:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Unit Tests', () => {
  function sum(a: number, b: number): number {
    return a + b;
  }

  test('sum function adds two numbers correctly', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
```

### API Tests

API tests are used to test API endpoints. Example:

```typescript
import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  test('GET /api/endpoint returns 200', async ({ request }) => {
    const response = await request.get('/api/endpoint');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('key');
  });
});
```

### E2E Tests

E2E tests are used to test the full application flow. Example:

```typescript
import { test, expect } from '@playwright/test';

test.describe('E2E Tests', () => {
  test('Home page loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });
});
```

## Configuration

The Playwright configuration is in `playwright.config.ts` in the root directory. You can modify this file to change the test settings.

## Debugging

To debug tests, you can use the UI mode:

```bash
npm run test:ui
```

Or run with the `--debug` flag:

```bash
npx playwright test --debug
```

## CI/CD Integration

Playwright tests can be run in CI/CD pipelines. The configuration is set up to work with most CI/CD providers.

For more information, see the [Playwright documentation](https://playwright.dev/docs/ci).
