import logger from './logger';

// Define a type for component names to ensure consistency
type ComponentName = string;

/**
 * Creates a component-specific logger that prefixes all logs with the component name
 * @param componentName The name of the component using the logger
 * @returns An object with logging methods
 */
export function createComponentLogger(componentName: ComponentName) {
  return {
    error: (message: string, meta?: Record<string, unknown>) => {
      logger.error(`[${componentName}] ${message}`, { meta });
    },
    warn: (message: string, meta?: Record<string, unknown>) => {
      logger.warn(`[${componentName}] ${message}`, { meta });
    },
    info: (message: string, meta?: Record<string, unknown>) => {
      logger.info(`[${componentName}] ${message}`, { meta });
    },
    http: (message: string, meta?: Record<string, unknown>) => {
      logger.http(`[${componentName}] ${message}`, { meta });
    },
    debug: (message: string, meta?: Record<string, unknown>) => {
      logger.debug(`[${componentName}] ${message}`, { meta });
    },
  };
}

/**
 * Logs performance metrics for a function or operation
 * @param operationName The name of the operation being measured
 * @param fn The function to measure
 * @returns The result of the function
 */
export async function logPerformance<T>(
  operationName: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = Date.now();
  
  try {
    const result = await fn();
    const duration = Date.now() - start;
    
    logger.debug(`[Performance] ${operationName} completed in ${duration}ms`);
    
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    
    logger.error(
      `[Performance] ${operationName} failed after ${duration}ms: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    
    throw error;
  }
}

/**
 * Synchronous version of logPerformance
 */
export function logPerformanceSync<T>(
  operationName: string,
  fn: () => T
): T {
  const start = Date.now();
  
  try {
    const result = fn();
    const duration = Date.now() - start;
    
    logger.debug(`[Performance] ${operationName} completed in ${duration}ms`);
    
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    
    logger.error(
      `[Performance] ${operationName} failed after ${duration}ms: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    
    throw error;
  }
}

// Export the base logger for direct use
export { logger };
