// Importing the Express module for handling routing.
import express from 'express';
// Importing the CommentController class to handle comment-related operations.
import { CommentController } from '../controllers/commentController';

// Creating a new instance of Express router.
export const router = express.Router();

// Define routes for creating, updating, deleting, and retrieving comments.

// POST route to create a new comment.
router.post('/comments', CommentController.createComment);

// PUT route to update an existing comment by its id.
router.put('/comments/:id', CommentController.updateComment);

// DELETE route to delete a comment by its id.
router.delete('/comments/:id', CommentController.deleteComment);

// GET route to retrieve a specific comment by its id.
router.get('/comments/:id', CommentController.getComment);
