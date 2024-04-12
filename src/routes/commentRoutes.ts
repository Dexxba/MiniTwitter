// Import necessary modules and classes.
import express from 'express';// Import the express library to handle HTTP requests and routing
import { CommentController } from '../controllers/commentController';// Import the CommentController to link routes to controller methods

// Create a new router object to define routes for specific paths and HTTP methods.
export const router = express.Router();

// Define a POST route for creating new tweets.
router.post('/comments', CommentController.createComment);
// This route handles POST requests to the '/comment' endpoint. It uses the createTweet method
// from the CommentController to process the creation of a comment. This method typically handles
// the extraction of tweet data from the request body and saving it to the database.

// Define a PUT route for updating existing tweets.
router.put('/comments/:id', CommentController.updateComment);
// This route handles PUT requests to the '/comment/:id' endpoint, where ':id' is a placeholder for the tweet ID.
// It uses the updateTweet method from the CommentController to update an existing tweet based on the ID provided in the URL
// and the new content provided in the request body.

// Define a DELETE route for deleting tweets.
router.delete('/comments/:id', CommentController.deleteComment);
// This route handles DELETE requests to the '/comment/:id' endpoint. It uses the deleteTweet method
// from the CommentController to remove a tweet from the database based on the ID provided in the URL.

// Define a GET route to retrieve a specific tweet by ID.
router.get('/comments/:id', CommentController.getCommentById);
// This route handles GET requests to the '/comment/:id' endpoint. It uses the getTweetById method
// from the TweetController to retrieve and return a tweet based on the ID specified in the URL.
// If the tweet exists, it is returned; otherwise, a 404 status code is sent back to the client.

// This configuration of routes ensures that the server can respond to CRUD operations related to tweets:
// creating, reading (retrieving), updating, and deleting, following RESTful principles.