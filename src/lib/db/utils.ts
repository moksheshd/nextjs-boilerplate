import { query, transaction, pool, getClient } from './config';
import { PoolClient } from 'pg';
import { logger } from '../log-utils';

// Create a database-specific logger
const dbLogger = logger.child({ module: 'database' });

/**
 * Execute a query with logging and error handling
 * @param text The SQL query text
 * @param params The query parameters
 * @returns The query result
 */
export async function executeQuery<T>(text: string, params?: any[]): Promise<T[]> {
  try {
    dbLogger.debug(`Executing query: ${text}`);
    if (params) {
      dbLogger.debug(`Query parameters: ${JSON.stringify(params)}`);
    }
    
    const startTime = Date.now();
    const result = await query<T>(text, params);
    const duration = Date.now() - startTime;
    
    dbLogger.debug(`Query completed in ${duration}ms, returned ${result.length} rows`);
    return result;
  } catch (error) {
    dbLogger.error(`Query error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}

/**
 * Execute a transaction with logging and error handling
 * @param callback A function that receives a client and executes queries
 * @returns The result of the callback function
 */
export async function executeTransaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  try {
    dbLogger.debug('Starting transaction');
    const startTime = Date.now();
    
    const result = await transaction(callback);
    
    const duration = Date.now() - startTime;
    dbLogger.debug(`Transaction completed in ${duration}ms`);
    
    return result;
  } catch (error) {
    dbLogger.error(`Transaction error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}

/**
 * Check if the database connection is working
 * @returns True if the connection is working, false otherwise
 */
export async function checkConnection(): Promise<boolean> {
  let client;
  try {
    client = await getClient();
    await client.query('SELECT 1');
    return true;
  } catch (error) {
    dbLogger.error(`Connection check failed: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  } finally {
    if (client) {
      client.release();
    }
  }
}

/**
 * Close all database connections
 * This should be called when shutting down the application
 */
export async function closeConnections(): Promise<void> {
  try {
    dbLogger.info('Closing all database connections');
    await pool.end();
    dbLogger.info('All database connections closed');
  } catch (error) {
    dbLogger.error(`Error closing connections: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}

/**
 * Create a table if it doesn't exist
 * @param tableName The name of the table
 * @param schema The schema definition (SQL)
 */
export async function createTableIfNotExists(tableName: string, schema: string): Promise<void> {
  try {
    dbLogger.info(`Ensuring table exists: ${tableName}`);
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        ${schema}
      )
    `);
    dbLogger.info(`Table ${tableName} is ready`);
  } catch (error) {
    dbLogger.error(`Error creating table ${tableName}: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}
