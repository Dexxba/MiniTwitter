// Importing necessary modules:
// express for creating the router and handling HTTP requests,
// TweetController for handling the business logic related to tweets.
import express from 'express';
import { TweetController } from '../controllers/tweetController';

// Creating a new router instance using express.Router() to manage our routes.
export const router = express.Router();

// Route for creating a new tweet.
// This route listens for POST requests on the '/tweets' path.
// The createTweet method from the TweetController class is used as the callback function
// to handle the request and response.
router.post('/tweets', TweetController.createTweet);

// Route for updating an existing tweet.
// This route listens for PUT requests on the '/tweets/:id' path, where ':id' is a variable part of the URL
// that represents the unique identifier of the tweet to be updated.
// The updateTweet method from the TweetController class is used as the callback function
// to handle the request and response.
router.put('/tweets/:id', TweetController.updateTweet);

// Route for deleting an existing tweet.
// This route listens for DELETE requests on the '/tweets/:id' path, similar to the update route,
// using ':id' to specify the tweet that should be deleted.
// The deleteTweet method from the TweetController class is used as the callback function
// to handle the request and response.
router.delete('/tweets/:id', TweetController.deleteTweet);

// Route for retrieving a specific tweet by its id.
// This route listens for GET requests on the '/tweets/:id' path, with ':id' indicating the tweet to retrieve.
// The getTweet method from the TweetController class is used as the callback function
// to handle the request and response, providing the tweet data or an error message.
router.get('/tweets/:id', TweetController.getTweet);
