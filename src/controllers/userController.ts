// Import necessary modules
import express from 'express'; // Express library for handling HTTP requests
import { User } from '../models/user'; // User model to interact with the user data

// Define a class to handle user-related routes in your application
export class UserController {
    // Method to create a user
    static async createUser(req: express.Request, res: express.Response) {
        try {
            // Extract user details from the request body
            const { username, email, password, isAdmin } = req.body;
            // Create a new user using the User model's static 'create' method
            const user = await User.create(username, email, password, isAdmin);
            // If successful, send a 200 status with a success message
            res.status(200).send("User created successfully.");
        } catch (error) {
            // Handle any errors: if it's a known Error type, send its message; otherwise, send a generic error message
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send('Unknown error occurred');
            }
        }
    }

    // Method to update a user's details
    static async updateUser(req: express.Request, res: express.Response) {
        try {
            // Get the user ID from request parameters
            const { id } = req.params;
            // Extract potential updates from the request body
            const { username, email, password, isAdmin } = req.body;
            // Update the user using the parsed ID and provided details
            await User.update(parseInt(id), username, email, password, isAdmin);
            // If successful, send a 200 status with a success message
            res.status(200).send("User updated successfully.");
        } catch (error) {
            // Handle errors similarly as in createUser
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send('Unknown error occurred');
            }
        }
    }

    // Method to delete a user by ID
    static async deleteUser(req: express.Request, res: express.Response) {
        try {
            // Get the user ID from request parameters
            const { id } = req.params;
            // Delete the user using the User model's 'delete' method
            await User.delete(parseInt(id));
            // If successful, send a 200 status with a success message
            res.status(200).send("User deleted successfully.");
        } catch (error) {
            // Handle errors similarly as in createUser
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send('Unknown error occurred');
            }
        }
    }

    // Method to retrieve a user by their ID
    static async getUserById(req: express.Request, res: express.Response) {
        try {
            // Get the user ID from request parameters
            const { id } = req.params;
            // Retrieve the user using the User model's 'getById' method
            const user = await User.getById(parseInt(id));
            // Check if a user was found
            if (user) {
                // If user exists, send a 200 status with the user data
                res.status(200).send(user);
            } else {
                // If no user was found, send a 404 status with a not found message
                res.status(404).send("User not found.");
            }
        } catch (error) {
            // Handle errors similarly as in createUser
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send('Unknown error occurred');
            }
        }
    }
}
