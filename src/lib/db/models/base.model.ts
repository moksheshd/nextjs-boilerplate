import { executeQuery, executeTransaction } from '../utils';
import { PoolClient } from 'pg';
import { logger } from '../../log-utils';

// Create a model-specific logger
const modelLogger = logger.child({ module: 'model' });

/**
 * Base model class that provides common functionality for all models
 */
export abstract class BaseModel<T> {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  /**
   * Find all records in the table
   * @param limit Maximum number of records to return
   * @param offset Number of records to skip
   * @returns Array of records
   */
  async findAll(limit?: number, offset?: number): Promise<T[]> {
    try {
      let query = `SELECT * FROM ${this.tableName}`;
      const params: any[] = [];

      if (limit !== undefined) {
        query += ' LIMIT $1';
        params.push(limit);
      }

      if (offset !== undefined) {
        query += ' OFFSET $' + (params.length + 1);
        params.push(offset);
      }

      return await executeQuery<T>(query, params.length > 0 ? params : undefined);
    } catch (error) {
      modelLogger.error(`Error in findAll for ${this.tableName}: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  /**
   * Find a record by its ID
   * @param id The ID of the record
   * @returns The record or null if not found
   */
  async findById(id: string | number): Promise<T | null> {
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE id = $1 LIMIT 1`;
      const result = await executeQuery<T>(query, [id]);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      modelLogger.error(`Error in findById for ${this.tableName}: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  /**
   * Find records by a field value
   * @param field The field name
   * @param value The field value
   * @returns Array of matching records
   */
  async findByField(field: string, value: any): Promise<T[]> {
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE ${field} = $1`;
      return await executeQuery<T>(query, [value]);
    } catch (error) {
      modelLogger.error(`Error in findByField for ${this.tableName}: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  /**
   * Create a new record
   * @param data The record data
   * @returns The created record
   */
  async create(data: Partial<T>): Promise<T> {
    try {
      const fields = Object.keys(data);
      const values = Object.values(data);
      const placeholders = fields.map((_, i) => `$${i + 1}`).join(', ');
      
      const query = `
        INSERT INTO ${this.tableName} (${fields.join(', ')})
        VALUES (${placeholders})
        RETURNING *
      `;
      
      const result = await executeQuery<T>(query, values);
      return result[0];
    } catch (error) {
      modelLogger.error(`Error in create for ${this.tableName}: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  /**
   * Update a record by its ID
   * @param id The ID of the record
   * @param data The data to update
   * @returns The updated record
   */
  async update(id: string | number, data: Partial<T>): Promise<T | null> {
    try {
      const fields = Object.keys(data);
      const values = Object.values(data);
      
      const setClause = fields.map((field, i) => `${field} = $${i + 1}`).join(', ');
      
      const query = `
        UPDATE ${this.tableName}
        SET ${setClause}
        WHERE id = $${fields.length + 1}
        RETURNING *
      `;
      
      const result = await executeQuery<T>(query, [...values, id]);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      modelLogger.error(`Error in update for ${this.tableName}: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  /**
   * Delete a record by its ID
   * @param id The ID of the record
   * @returns True if the record was deleted, false otherwise
   */
  async delete(id: string | number): Promise<boolean> {
    try {
      const query = `DELETE FROM ${this.tableName} WHERE id = $1 RETURNING id`;
      const result = await executeQuery<{ id: string | number }>(query, [id]);
      return result.length > 0;
    } catch (error) {
      modelLogger.error(`Error in delete for ${this.tableName}: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  /**
   * Count the number of records in the table
   * @param whereClause Optional WHERE clause
   * @param params Optional parameters for the WHERE clause
   * @returns The number of records
   */
  async count(whereClause?: string, params?: any[]): Promise<number> {
    try {
      let query = `SELECT COUNT(*) as count FROM ${this.tableName}`;
      
      if (whereClause) {
        query += ` WHERE ${whereClause}`;
      }
      
      const result = await executeQuery<{ count: string }>(query, params);
      return parseInt(result[0].count, 10);
    } catch (error) {
      modelLogger.error(`Error in count for ${this.tableName}: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  /**
   * Execute a custom query
   * @param query The SQL query
   * @param params The query parameters
   * @returns The query result
   */
  async executeCustomQuery<R>(query: string, params?: any[]): Promise<R[]> {
    try {
      return await executeQuery<R>(query, params);
    } catch (error) {
      modelLogger.error(`Error in executeCustomQuery for ${this.tableName}: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  /**
   * Execute a transaction
   * @param callback A function that receives a client and executes queries
   * @returns The result of the callback function
   */
  async executeTransaction<R>(callback: (client: PoolClient) => Promise<R>): Promise<R> {
    try {
      return await executeTransaction(callback);
    } catch (error) {
      modelLogger.error(`Error in executeTransaction for ${this.tableName}: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }
}
