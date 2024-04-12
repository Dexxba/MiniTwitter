// Import required modules
import express from 'express'; // Import Express framework for building HTTP server functionalities
import { UserController } from '../controllers/userController'; // Import UserController to handle user specific logic

// Create a new router object from Express to manage different HTTP routes
export const router = express.Router();

// Define POST route for creating a new user
// When the /users endpoint is hit with a POST request, the createUser method from UserController is called
router.post('/users', UserController.createUser);

// Define PUT route for updating an existing user
// When the /users/:id endpoint is hit with a PUT request, the updateUser method in UserController is called
// :id is a route parameter that allows the middleware to capture the user ID from the URL
router.put('/users/:id', UserController.updateUser);

// Define DELETE route for deleting a user
// When the /users/:id endpoint is hit with a DELETE request, the deleteUser method in UserController is called
// This also uses :id to identify which user to delete
router.delete('/users/:id', UserController.deleteUser);

// Define GET route for retrieving a user by ID
// When the /users/:id endpoint is hit with a GET request, the getUser method in UserController is used
// The :id parameter here is used to fetch the specific user by their ID
router.get('/users/:id', UserController.getUserById);

// Define POST route for login
// When the /login endpoint is hit with a POST request, the login method from UserController is called
router.post('/login', UserController.loginUser);
