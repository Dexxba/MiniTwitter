// Importing the Express module for handling requests and responses.
import express from 'express';
// Importing the mysql2 library, which allows for promise-based interaction with MySQL databases.
import mysql from 'mysql2/promise';
// Importing a helper function that establishes a connection to the database.
import { getDatabaseConnection } from '../database';

// Define a class named `CommentController` to manage CRUD operations for comments.
export class CommentController {
  // Static method to create a new comment in the database.
  static async createComment(req: express.Request, res: express.Response) {
    // Establishing a connection to the database.
    const connection = await getDatabaseConnection();
    try {
      // Extract authorId, tweetId, and content from the request body.
      const { authorId, tweetId, content } = req.body;
      // SQL query string to insert a new comment into the Comment table.
      const query = 'INSERT INTO Comment (authorId, tweetId, content) VALUES (?, ?, ?)';
      // Execute the SQL query with the provided parameters.
      await connection.execute(query, [authorId, tweetId, content]);

      // If successful, return a 201 status code with a success message.
      res.status(201).json({ message: 'Comment created successfully' });
    } catch (error) {
      // Log any errors and send a 500 server error response.
      console.error(error);
      res.status(500).send({ message: 'Server error' });
    } finally {
      // Close the database connection.
      await connection.end();
    }
  }

  // Static method to update an existing comment.
  static async updateComment(req: express.Request, res: express.Response) {
    const connection = await getDatabaseConnection();
    try {
      // Extract id, authorId, tweetId, and content from the request body for updating.
      const { id, authorId, tweetId, content } = req.body;
      // SQL query to update the specified comment by its id.
      const query = 'UPDATE Comment SET authorId = ?, tweetId = ?, content = ? WHERE id = ?';
      // Execute the update query.
      await connection.execute(query, [authorId, tweetId, content, id]);

      // Return a 200 status code with a success message.
      res.status(200).json({ message: 'Comment updated successfully' });
    } catch (error) {
      // Handle errors by logging and sending a 500 server error.
      console.error(error);
      res.status(500).send({ message: 'Server error' });
    } finally {
      // Ensure the database connection is closed.
      await connection.end();
    }
  }

  // Static method to delete a comment by its id.
  static async deleteComment(req: express.Request, res: express.Response) {
    const connection = await getDatabaseConnection();
    try {
      // Get the comment id from the request body.
      const { id } = req.body;
      // SQL query to delete the comment with the specified id.
      const query = 'DELETE FROM Comment WHERE id = ?';
      // Execute the delete operation.
      await connection.execute(query, [id]);

      // Return a 200 status code with a deletion success message.
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      // Handle exceptions by logging and sending a 500 server error.
      console.error(error);
      res.status(500).send({ message: 'Server error' });
    } finally {
      // Close the database connection.
      await connection.end();
    }
  }

  // Static method to retrieve a specific comment by its id.
  static async getComment(req: express.Request, res: express.Response) {
    const connection = await getDatabaseConnection();
    try {
      // Extract the comment id from the request parameters.
      const { id } = req.params;
      // SQL query to select the comment by id.
      const query = 'SELECT * FROM Comment WHERE id = ?';
      // Execute the query and store the result.
      const [rows] = await connection.execute(query, [id]) as [any[], mysql.FieldPacket[]];

      // Check if any comment was found.
      if (rows.length > 0) {
        // If found, return the comment with a 200 status code.
        res.status(200).json(rows[0]);
      } else {
        // If no comment is found, return a 404 not found error.
        res.status(404).send({ message: 'Comment not found' });
      }
    } catch (error) {
      // Log errors and send a 500 server error response.
      console.error(error);
      res.status(500).send({ message: 'Server error' });
     } finally {
        // Ensure the database connection is closed once the operation is complete.
       await connection.end();
    }
 } 
}  
