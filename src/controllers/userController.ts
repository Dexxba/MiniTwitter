// Import necessary modules and functions
import express from 'express'; // Importing Express framework for building REST API
import bcrypt from 'bcryptjs'; // Importing bcrypt for password hashing
import mysql from 'mysql2'; // Importing mysql2 for database interaction
import { getDatabaseConnection } from '../database'; // Importing a custom function to handle database connection

// Define UserController class with static methods for user management
export class UserController {
  
  // Static method to create a new user
  static async createUser(req: express.Request, res: express.Response) {
    // Establish database connection
    const connection = await getDatabaseConnection();
    try {
      // Extract user data from request body
      const { username, email, password, isAdmin } = req.body;
      // Hash the password with a salt round of 12
      const hashedPassword = await bcrypt.hash(password, 12);

      // SQL query for inserting a new user into the database
      const query = 'INSERT INTO User (username, email, password, isAdmin) VALUES (?, ?, ?, ?)';
      // Execute the query with provided parameters
      await connection.execute(query, [username, email, hashedPassword, isAdmin]);

      // Respond with success status and message
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      // Log any errors and send server error response
      console.error(error);
      res.status(500).send({ message: 'Server error' });
    } finally {
      // Close the database connection
      await connection.end();
    }
  }

  // Static method to update an existing user
  static async updateUser(req: express.Request, res: express.Response) {
    // Reconnect to the database
    const connection = await getDatabaseConnection();
    try {
      // Extract user ID from URL parameters and user data from the body
      const { id } = req.params;
      const { username, email, password, isAdmin } = req.body;
      
      // Start building SQL update query
      let query = 'UPDATE User SET username = ?, email = ?, isAdmin = ?';
      const params = [username, email, isAdmin];

      // Check if password needs to be updated and hash it
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 12);
        query += ', password = ?';
        params.push(hashedPassword);
      }

      // Append WHERE clause to the SQL statement
      query += ' WHERE id = ?';
      params.push(id);

      // Execute update query
      await connection.execute(query, params);
      // Respond with success status and message
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      // Log any errors and send server error response
      console.error(error);
      res.status(500).send({ message: 'Server error' });
    } finally {
      // Ensure connection is closed after operation
      await connection.end();
    }
  }

  // Static method to delete a user
  static async deleteUser(req: express.Request, res: express.Response) {
    // Establish database connection
    const connection = await getDatabaseConnection();
    try {
      // Extract user ID from URL parameters
      const { id } = req.params;

      // SQL query to delete a user
      const query = 'DELETE FROM User WHERE id = ?';
      // Execute the delete query
      await connection.execute(query, [id]);

      // Respond with success status and message
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      // Log any errors and send server error response
      console.error(error);
      res.status(500).send({ message: 'Server error' });
    } finally {
      // Close the database connection
      await connection.end();
    }
  }

  // Static method to retrieve a user by their ID
  static async getUser(req: express.Request, res: express.Response) {
    // Establish database connection
    const connection = await getDatabaseConnection();
    try {
      // Extract user ID from URL parameters
      const { id } = req.params;

      // SQL query to fetch a user by ID
      const query = 'SELECT * FROM User WHERE id = ?';
      // Execute the query and store the results
      const [rows] = await connection.execute(query, [id]) as [any[], mysql.FieldPacket[]];

      // Check if user exists and respond accordingly
      if (rows.length > 0) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    } catch (error) {
      // Log any errors and send server error response
      console.error(error);
      res.status(500).send({ message: 'Server error' });
    } finally {
      // Ensure the database connection is closed
      await connection.end();
    }
  }
}
