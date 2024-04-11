// Importing necessary modules and functions:
// express for handling HTTP requests and responses,
// mysql2 for interacting with the MySQL database,
// getDatabaseConnection from '../database' to establish database connections.
import express from 'express';
import mysql from 'mysql2';
import { getDatabaseConnection } from '../database'; 

// TweetController class to handle tweet-related operations (CRUD).
export class TweetController {
  // Static method to create a new tweet.
  static async createTweet(req: express.Request, res: express.Response) {
    const connection = await getDatabaseConnection(); // Establish a connection to the database.
    try {
      const { content, authorId } = req.body; // Destructuring to extract content and authorId from the request body.
      // SQL query to insert the new tweet into the database.
      const query = 'INSERT INTO Tweet (content, authorId) VALUES (?, ?)';
      // Executing the query with the provided content and authorId.
      await connection.execute(query, [content, authorId]);

      // If successful, respond with status 201 (Created) and a success message.
      res.status(201).json({ message: 'Tweet created successfully' });
    } catch (error) {
      // Log the error to the console and respond with status 500 (Server Error) and an error message.
      console.error(error);
      res.status(500).send({ message: 'Server error' });
    } finally {
      // Ensure the database connection is closed once the operation is complete.
      await connection.end();
    }
  }

  // Static method to update an existing tweet.
  static async updateTweet(req: express.Request, res: express.Response) {
    const connection = await getDatabaseConnection(); // Establish a connection to the database.
    try {
      // Destructuring to extract id, content, and authorId from the request body.
      const { id, content, authorId } = req.body;
      // SQL query to update the specified tweet in the database.
      const query = 'UPDATE Tweet SET content = ?, authorId = ? WHERE id = ?';
      // Executing the query with the provided content, authorId, and tweet id.
      await connection.execute(query, [content, authorId, id]);

      // If successful, respond with status 200 (OK) and a success message.
      res.status(200).json({ message: 'Tweet updated successfully' });
    } catch (error) {
      // Log the error to the console and respond with status 500 (Server Error) and an error message.
      console.error(error);
      res.status(500).send({ message: 'Server error' });
    } finally {
      // Ensure the database connection is closed once the operation is complete.
      await connection.end();
    }
  }

  // Static method to delete an existing tweet.
  static async deleteTweet(req: express.Request, res: express.Response) {
    const connection = await getDatabaseConnection(); // Establish a connection to the database.
    try {
      const { id } = req.body; // Extracting id from the request body.
      // SQL query to delete the specified tweet from the database.
      const query = 'DELETE FROM Tweet WHERE id = ?';
      // Executing the query with the provided tweet id.
      await connection.execute(query, [id]);

      // If successful, respond with status 200 (OK) and a success message.
      res.status(200).json({ message: 'Tweet deleted successfully' });
    } catch (error) {
      // Log the error to the console and respond with status 500 (Server Error) and an error message.
      console.error(error);
      res.status(500).send({ message: 'Server error' });
    } finally {
      // Ensure the database connection is closed once the operation is complete.
      await connection.end();
    }
  }

  // Static method to retrieve a specific tweet by its id.
  static async getTweet(req: express.Request, res: express.Response) {
    const connection = await getDatabaseConnection(); // Establish a connection to the database.
    try {
      const { id } = req.params; // Extracting id from the request parameters.
      // SQL query to select the tweet with the specified id from the database.
      const query = 'SELECT * FROM Tweet WHERE id = ?';
      // Executing the query with the provided tweet id.
      const [rows] = await connection.execute(query, [id]) as [any[], mysql.FieldPacket[]];

      // If a tweet is found, respond with status 200 (OK) and the tweet data.
      if (rows.length > 0) {
        res.status(200).json(rows[0]);
      } else {
        // If no tweet is found, respond with status 404 (Not Found) and an error message.
        res.status(404).send({ message: 'Tweet not found' });
      }
    } catch (error) {
      // Log the error to the console and respond with status 500 (Server Error) and an error message.
      console.error(error);
      res.status(500).send({ message: 'Server error' });
    } finally {
      // Ensure the database connection is closed once the operation is complete.
      await connection.end();
    }
  }
}
