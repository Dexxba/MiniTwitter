import mysql from 'mysql2/promise';
import { config } from './config';

export class getDatabaseConnection {
  private connection!: mysql.Connection;

  private constructor(connection: mysql.Connection) {
    this.connection = connection;
  }

  public static async create() {
    const connection = await mysql.createConnection({
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database
    });
    return new getDatabaseConnection(connection);
  }

  public async query(sql: string, params: any[] = []) {
    try {
      const [results,] = await this.connection.execute(sql, params);
      return results;
    } catch (error) {
      console.error('Database query error', error);
      throw error;
    }
  }

  public async close() {
    await this.connection.end();
  }
}
