import { Pool, PoolConfig, PoolClient } from 'pg';

// Define environment-specific database configurations
const environments = {
  development: {
    host: process.env.PGHOST || 'localhost',
    port: parseInt(process.env.PGPORT || '5432', 10),
    database: process.env.PGDATABASE || 'icai_udin_dev',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    max: 10, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  },
  test: {
    host: process.env.PGHOST || 'localhost',
    port: parseInt(process.env.PGPORT || '5432', 10),
    database: process.env.PGDATABASE || 'icai_udin_test',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    max: 5,
    idleTimeoutMillis: 30000,
  },
  production: {
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || '5432', 10),
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl: {
      rejectUnauthorized: false, // Needed for some cloud providers like Heroku
    },
    max: 20,
    idleTimeoutMillis: 30000,
  },
};

// Get the current environment
const env = process.env.NODE_ENV || 'development';

// Select the appropriate configuration
const config: PoolConfig = environments[env as keyof typeof environments] || environments.development;

// Create a new pool using the configuration
const pool = new Pool(config);

// Log connection errors
pool.on('error', (err: Error) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

/**
 * Execute a query using a new client from the pool
 * @param text The SQL query text
 * @param params The query parameters
 * @returns The query result
 */
export async function query<T>(text: string, params?: any[]): Promise<T[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows as T[];
  } finally {
    client.release();
  }
}

/**
 * Execute a transaction with multiple queries
 * @param callback A function that receives a client and executes queries
 * @returns The result of the callback function
 */
export async function transaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

/**
 * Get a client from the pool
 * @returns A client from the pool
 */
export async function getClient(): Promise<PoolClient> {
  return await pool.connect();
}

// Export the pool for direct use if needed
export { pool };

// Export the current environment
export const currentEnv = env;
