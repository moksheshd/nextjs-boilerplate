# Winston Logging System

This project uses Winston for logging. This document explains how to use the logging system effectively in your application.

## Basic Usage

The simplest way to use the logger is to import it directly:

```typescript
import { logger } from '@/lib/log-utils';

// Log at different levels
logger.error('This is an error message');
logger.warn('This is a warning message');
logger.info('This is an info message');
logger.http('This is an HTTP message');
logger.debug('This is a debug message');
```

## Component-Specific Logging

For React components, use the `createComponentLogger` utility to create a component-specific logger:

```typescript
import { createComponentLogger } from '@/lib/log-utils';

// Create a logger for your component
const logger = createComponentLogger('YourComponentName');

export default function YourComponent() {
  // Use the logger in your component
  logger.info('Component rendering');
  
  const handleClick = () => {
    logger.debug('Button clicked');
    // Your logic here
  };
  
  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
```

## Performance Logging

To measure and log the performance of operations, use the `logPerformance` utility:

```typescript
import { logPerformance, logPerformanceSync } from '@/lib/log-utils';

// For async functions
async function fetchData() {
  return await logPerformance('fetchData', async () => {
    // Your async code here
    const response = await fetch('/api/data');
    return await response.json();
  });
}

// For synchronous functions
function processData(data) {
  return logPerformanceSync('processData', () => {
    // Your sync code here
    return data.map(item => item.value * 2);
  });
}
```

## HTTP Request Logging

HTTP requests are automatically logged by the middleware in `src/middleware.ts`. This logs:

- Incoming requests with method and path
- Request processing time

## Log Levels

The logger uses the following log levels (in order of severity):

1. `error` - For errors and exceptions
2. `warn` - For warnings and potential issues
3. `info` - For general information
4. `http` - For HTTP requests and responses
5. `debug` - For detailed debugging information

In development, all log levels are displayed. In production, only `warn` and `error` logs are shown by default.

## Log Files

Logs are written to the following files:

- `logs/error.log` - Contains only error-level logs
- `logs/all.log` - Contains all logs

Make sure the `logs` directory exists and is writable.

## Configuration

The logger configuration is in `src/lib/logger.ts`. You can modify this file to:

- Change log formats
- Add or remove transports
- Adjust log levels based on environment
- Customize colors

## Best Practices

1. Use the appropriate log level for your message
2. Include relevant context in your log messages
3. For components, use the component-specific logger
4. For API routes, log the beginning and end of request processing
5. Log errors with as much detail as possible
6. Use performance logging for potentially slow operations
