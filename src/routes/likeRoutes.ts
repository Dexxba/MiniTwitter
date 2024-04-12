// Import necessary modules and classes.
import express from 'express'; // Import the express library to handle HTTP requests and routing
import { LikeController } from '../controllers/likeController';

// Create a new router object to define routes for specific paths and HTTP methods.
export const router = express.Router();
// Define a POST route for creating new likes.
router.post('/likes', LikeController.createLike);
// This route handles POST requests to the '/likes' endpoint. It uses the createTweet method
// from the TweetController to process the creation of a tweet. This method typically handles
// the extraction of tweet data from the request body and saving it to the database.
// Define a PUT route for updating existing likes.
router.put('/likes/:id', LikeController.updateLike);
// This route handles PUT requests to the '/like/:id' endpoint, where ':id' is a placeholder for the tweet ID.
// It uses the updateTweet method from the TweetController to update an existing tweet based on the ID provided in the URL
// and the new content provided in the request body.
// Define a DELETE route for deleting tweets.
router.delete('/like/:id', LikeController.deleteLike);
// This route handles DELETE requests to the '/like/:id' endpoint. It uses the deleteTweet method
// from the TweetController to remove a tweet from the database based on the ID provided in the URL.
// Define a GET route to retrieve a specific tweet by ID.
router.get('/like/:id', LikeController.getLiketById);
// This route handles GET requests to the '/like/:id' endpoint. It uses the getTweetById method
// from the TweetController to retrieve and return a tweet based on the ID specified in the URL.
// If the tweet exists, it is returned; otherwise, a 404 status code is sent back to the client.

// This configuration of routes ensures that the server can respond to CRUD operations related to tweets:
// creating, reading (retrieving), updating, and deleting, following RESTful principles.