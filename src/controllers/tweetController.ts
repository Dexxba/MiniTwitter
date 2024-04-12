// Import necessary modules and classes.
import express from 'express'; // Importing express to handle HTTP requests and responses
import { Tweet } from '../models/tweet'; // Import the Tweet model to manage tweet data

// Define a class that handles HTTP requests for tweet operations
export class TweetController {
    // Method to create a tweet using the HTTP request data
    static async createTweet(req: express.Request, res: express.Response) {
        try {
            // Extract content and author from the request body
            const { content, author } = req.body;
            // Call the static 'create' method from the Tweet class to create a new tweet
            const tweet = await Tweet.create(content, author);
            // If creation is successful, send the tweet data with a 200 HTTP status
            res.status(200).send(tweet);
        } catch (error) {
            // Handle any errors that occur during the process
            if (error instanceof Error) {
                res.status(500).send(error.message); // Send specific error message if known
            } else {
                res.status(500).send('Unknown error occurred'); // Send generic error message if error type is unknown
            }
        }
    }

    // Method to update a tweet based on the tweet ID and new data provided
    static async updateTweet(req: express.Request, res: express.Response) {
        try {
            // Extract the tweet ID from the URL parameters
            const { id } = req.params;
            // Extract content and author updates from the request body
            const { content, author } = req.body;
            // Call the static 'update' method from the Tweet class to update the tweet
            await Tweet.update(parseInt(id), content, author);
            // If the update is successful, send a success message with a 200 HTTP status
            res.status(200).send("Tweet updated successfully.");
        } catch (error) {
            // Handle any errors that occur during the process
            if (error instanceof Error) {
                res.status(500).send(error.message); // Send specific error message if known
            } else {
                res.status(500).send('Unknown error occurred'); // Send generic error message if error type is unknown
            }
        }
    }

    // Method to delete a tweet based on the tweet ID
    static async deleteTweet(req: express.Request, res: express.Response) {
        try {
            // Extract the tweet ID from the URL parameters
            const { id } = req.params;
            // Call the static 'delete' method from the Tweet class to delete the tweet
            await Tweet.delete(parseInt(id));
            // If deletion is successful, send a success message with a 200 HTTP status
            res.status(200).send("Tweet deleted successfully.");
        } catch (error) {
            // Handle any errors that occur during the process
            if (error instanceof Error) {
                res.status(500).send(error.message); // Send specific error message if known
            } else {
                res.status(500).send('Unknown error occurred'); // Send generic error message if error type is unknown
            }
        }
    }

    // Method to retrieve a tweet by its ID
    static async getTweetById(req: express.Request, res: express.Response) {
        try {
            // Extract the tweet ID from the URL parameters
            const { id } = req.params;
            // Call the static 'getById' method from the Tweet class to retrieve the tweet
            const tweet = await Tweet.getById(parseInt(id));
            // Check if the tweet was found
            if (tweet) {
                // If found, send the tweet data with a 200 HTTP status
                res.status(200).send(tweet);
            } else {
                // If not found, send a 404 HTTP status with a not found message
                res.status(404).send("Tweet not found.");
            }
        } catch (error) {
            // Handle any errors that occur during the process
            if (error instanceof Error) {
                res.status(500).send(error.message); // Send specific error message if known
            } else {
                res.status(500).send('Unknown error occurred'); // Send generic error message if error type is unknown
            }
        }
    }
}
