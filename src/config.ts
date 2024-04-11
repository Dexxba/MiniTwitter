// Import the dotenv module
import dotenv from 'dotenv'; 
// Call the config function from the dotenv package to load environment variables from a .env file into process.env
dotenv.config();

// Export an object named 'config' which holds the configuration data for the database connection
export const config = {
  db: {
    host: process.env.DB_HOST,       // Retrieve the database host from environment variables
    user: process.env.DB_USER,       // Retrieve the database user from environment variables
    password: process.env.DB_PASSWORD, // Retrieve the database password from environment variables
    database: process.env.DB_DATABASE // Retrieve the database name from environment variables
  }
};
