// Import required modules
import express from 'express'; // Importing Express framework for handling server-side logic
import mysql from 'mysql2'; // Importing mysql2 for database interactions
import { config } from './config'; // Importing configuration settings (like database credentials)
import { router as userRoutes } from './routes/userRoutes';  // Importing routes defined for user operations
import { router as tweetRoutes } from  './routes/tweetRoutes'; // Importing routes defined for tweet operations
import { router as commentRoutes } from  './routes/commentRoutes' // Importing routes defined for comment operations
import {router as likeRoutes } from  "./routes/likeRoutes"; // Importing routes defined for like operations


// Creating a new connection to the MySQL database using the configuration imported from './config'
export const connection = mysql.createConnection({
  host: config.db.host,         // Database host (e.g., 'localhost')
  user: config.db.user,         // Database user
  password: config.db.password, // Database password
  database: config.db.database  // Database name
});

// Connect to the database and handle connection errors or success
connection.connect(error => {
  if (error) {
    // Log error if connection fails
    console.error("Error connecting to the database:", error);
    return;
  }
  // Log on successful connection
  console.log("Successfully connected to the database.");
});

// Initialize the Express application
const app = express();
// Define the port on which the server will run. Use environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Add middleware to parse JSON bodies. This is crucial for handling POST and PUT requests
app.use(express.json());

// Include user-defined routes into the application to handle user-related operations
app.use(userRoutes);
// Include tweet-defined routes into the application to handle user-related operations
app.use(tweetRoutes);
// Include comment-defined routes into the application to handle user-related operations
app.use(commentRoutes);
// Include comment-defined routes into the application to handle user-related operations
app.use(likeRoutes);



// Define a simple route for the root path to send a greeting
app.get('/', (req, res) => {
  res.send('Hello, MiniTwitter!');
});

// Start the server on the defined PORT and log the address
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
