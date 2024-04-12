// Import necessary modules and classes.
import express from 'express'; // Express library for handling HTTP requests and responses
import { Comment } from '../models/comment'; // Import the Comment model to manage comment data

// Define the CommentController class with static methods for handling comment-related routes.
export class CommentController {
    // Method to create a new comment.
    static async createComment(req: express.Request, res: express.Response) {
        try {
            // Extract the author, tweet, and content from the request body.
            const { author, tweet, content } = req.body;
            // Use the Comment model's create method to save a new comment to the database.
            const comment = await Comment.create(author, tweet, content);
            // Respond with a 200 status code and the newly created comment.
            res.status(200).send(comment);
        } catch (error) {
            // Handle errors: check if the error is an instance of Error and send an appropriate message.
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send('Unknown error occurred');
            }
        }
    }

    // Method to update an existing comment.
    static async updateComment(req: express.Request, res: express.Response) {
        try {
            // Extract the comment ID from URL parameters and the new details from the request body.
            const { id } = req.params;
            const { author, tweet, content } = req.body;
            // Update the comment using the Comment model's update method.
            await Comment.update(parseInt(id), author, tweet, content);
            // Respond with a 200 status code and a success message.
            res.status(200).send("Comment updated successfully.");
        } catch (error) {
            // Handle errors similarly to the create method.
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send('Unknown error occurred');
            }
        }
    }

    // Method to delete a comment.
    static async deleteComment(req: express.Request, res: express.Response) {
        try {
            // Extract the comment ID from URL parameters.
            const { id } = req.params;
            // Delete the comment using the Comment model's delete method.
            await Comment.delete(parseInt(id));
            // Respond with a 200 status code and a success message.
            res.status(200).send("Comment deleted successfully.");
        } catch (error) {
            // Handle errors similarly to the create method.
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send('Unknown error occurred');
            }
        }
    }

    // Method to retrieve a comment by its ID.
    static async getCommentById(req: express.Request, res: express.Response) {
        try {
            // Extract the comment ID from URL parameters.
            const { id } = req.params;
            // Retrieve the comment using the Comment model's getById method.
            const comment = await Comment.getById(parseInt(id));
            if (comment) {
                // If the comment exists, respond with a 200 status code and the comment.
                res.status(200).send(comment);
            } else {
                // If no comment is found, respond with a 404 status code and an error message.
                res.status(404).send("Comment not found.");
            }
        } catch (error) {
            // Handle errors similarly to the create method.
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send('Unknown error occurred');
            }
        }
    }
}
