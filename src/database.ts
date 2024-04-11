// Import the promise-based version of mysql2
import mysql from 'mysql2/promise';
// Import the configuration settings from a local file 'config.js'
import { config } from './config'; 

// Define and export an asynchronous function to establish a database connection
export async function getDatabaseConnection() {
  // The 'await' keyword is used here to wait for the promise returned by createConnection to resolve
  return await mysql.createConnection({
    host: config.db.host,       // Retrieve the database host from the configuration object
    user: config.db.user,       // Retrieve the username for database access from the configuration object
    password: config.db.password, // Retrieve the password for database access from the configuration object
    database: config.db.database // Retrieve the database name from the configuration object
  });
}
