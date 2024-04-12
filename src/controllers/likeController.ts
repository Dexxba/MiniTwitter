// Import necessary modules and classes.
import express from 'express'; // Express library for handling HTTP requests and responses
import { Like } from '../models/like'; // Import the Like model to manage like data

// Define the LikeController class with static methods to handle HTTP requests.
export class LikeController {
    // Method to handle creating a like.
    static async createLike(req: express.Request, res: express.Response) {
        try {
            // Extract liker and likedTweet from the request body.
            const { liker, likedTweet } = req.body;
            // Call the create method on Like model to create a new like in the database.
            const like = await Like.create(liker, likedTweet);
            // Respond with a 200 OK status and the newly created like object.
            res.status(200).send(like);
        } catch (error) {
            // Handle any errors that occur during the create operation.
            if (error instanceof Error) {
                // If it's a known error, send the error message.
                res.status(500).send(error.message);
            } else {
                // For unknown errors, send a generic error message.
                res.status(500).send('Unknown error occurred');
            }
        }
    }

    // Method to handle updating an existing like.
    static async updateLike(req: express.Request, res: express.Response) {
        try {
            // Extract the like ID from URL parameters and the new data from the request body.
            const { id } = req.params;
            const { liker, likedTweet } = req.body;
            // Call the update method on Like model to update the like in the database.
            await Like.update(parseInt(id), liker, likedTweet);
            // Respond with a 200 OK status and a success message.
            res.status(200).send("Like updated successfully.");
        } catch (error) {
            // Handle any errors that occur during the update operation.
            if (error instanceof Error) {
                // If it's a known error, send the error message.
                res.status(500).send(error.message);
            } else {
                // For unknown errors, send a generic error message.
                res.status(500).send('Unknown error occurred');
            }
        }
    }

    // Method to handle deleting a like.
    static async deleteLike(req: express.Request, res: express.Response) {
        try {
            // Extract the like ID from URL parameters.
            const { id } = req.params;
            // Call the delete method on Like model to remove the like from the database.
            await Like.delete(parseInt(id));
            // Respond with a 200 OK status and a success message.
            res.status(200).send("Like removed successfully.");
        } catch (error) {
            // Handle any errors that occur during the delete operation.
            if (error instanceof Error) {
                // If it's a known error, send the error message.
                res.status(500).send(error.message);
            } else {
                // For unknown errors, send a generic error message.
                res.status(500).send('Unknown error occurred');
            }
        }
    }

    // Method to handle retrieving a like by its ID.
    static async getLikeById(req: express.Request, res: express.Response) {
        try {
            // Extract the like ID from URL parameters.
            const { id } = req.params;
            // Call the getById method on Like model to retrieve the like from the database.
            const like = await Like.getById(parseInt(id));
            if (like) {
                // If the like exists, respond with a 200 OK status and the like object.
                res.status(200).send(like);
            } else {
                // If the like does not exist, respond with a 404 Not Found status and a message.
                res.status(404).send("Like not found.");
            }
        } catch (error) {
            // Handle any errors that occur during the retrieval operation.
            if (error instanceof Error) {
                // If it's a known error, send the error message.
                res.status(500).send(error.message);
            } else {
                // For unknown errors, send a generic error message.
                res.status(500).send('Unknown error occurred');
            }
        }
    }
}
