// Import necessary modules and classes for database interaction and data modeling.
import { getDatabaseConnection } from '../database'; // Utility to handle database connections
import mysql, { RowDataPacket } from 'mysql2/promise'; // MySQL library with promise support for async operations
import { ResultSetHeader } from 'mysql2'; // Type definition for result sets from MySQL queries
import { connection } from '../app'; // Shared database connection from your app configuration
import { User } from './user'; // User class for comment author representation
import { Tweet } from './tweet'; // Tweet class for associating comments with tweets

// Define a class named `Comment` to represent comments on tweets.
export class Comment {
    // Private properties to encapsulate comment data.
    id: number;               // Unique identifier for the comment
    private author: User;     // Author of the comment, represented by a User object
    private tweet: Tweet;     // The tweet to which this comment is attached, represented by a Tweet object
    private content: string;  // Text content of the comment

    // Constructor initializes a new Comment object.
    constructor(id: number, author: User, tweet: Tweet, content: string) {
        this.id = id;           // Set the comment's ID
        this.author = author;   // Set the author of the comment
        this.tweet = tweet;     // Set the associated tweet
        this.content = content; // Set the textual content of the comment
    }

    // Getter methods to provide read access to the private properties.
    getId(): number {
        return this.id;  // Returns the unique identifier of the comment
    }

    getAuthor(): User {
        return this.author;  // Returns the author of the comment as a User object
    }

    getTweet(): Tweet {
        return this.tweet;  // Returns the associated tweet as a Tweet object
    }

    getContent(): string {
        return this.content;  // Returns the text content of the comment
    }

    // Setter methods to allow modification of private properties.
    setId(id: number): void {
        this.id = id;  // Updates the ID of the comment
    }

    setAuthor(author: User): void {
        this.author = author;  // Updates the author of the comment
    }

    setTweet(tweet: Tweet): void {
        this.tweet = tweet;  // Updates the associated tweet
    }

    setContent(content: string): void {
        this.content = content;  // Updates the text content of the comment
    }

    // Static method to create a new comment in the database.
    static async create(author: User, tweet: Tweet, content: string): Promise<Comment> {
        const db = await getDatabaseConnection.create(); // Establish a new database connection
        const sql = `INSERT INTO comment (authorId, tweetId, content) VALUES(?, ?, ?);`; // SQL query to insert a new comment
        return new Promise((resolve, reject) => {
            connection.query<ResultSetHeader>(sql, [author.id, tweet.id, content], (err, results) => {
                db.close(); // Close the database connection
                if (err) reject(err);
                // Resolve the promise with a new instance of Comment
                resolve(new Comment(results.insertId, author, tweet, content));
            });
        });
    }

    // Static method to update an existing comment in the database.
    static async update(id: number, author?: User, tweet?: Tweet, content?: string): Promise<void> {
        const db = await getDatabaseConnection.create(); // Establish a new database connection
        const updates = []; // Array to accumulate SQL set clauses
        const params = []; // Parameters for the SQL query

        // Append changes to updates and params arrays based on provided arguments
        if (author) {
            updates.push('authorId=?');
            params.push(author.id);
        }
        if (tweet) {
            updates.push('tweetId=?');
            params.push(tweet.id);
        }
        if (content) {
            updates.push('content=?');
            params.push(content);
        }
        if (params.length > 0) {
            params.push(id); // Append the comment ID last for the WHERE clause
            const sql = `UPDATE comment SET ${updates.join(',')} WHERE id =?`; // Build the SQL update query
            await db.query(sql, params); // Execute the query
        }
        db.close(); // Close the database connection
    }

    // Static method to delete a comment from the database.
    static async delete(id: number): Promise<void> {
        const db = await getDatabaseConnection.create(); // Establish a new database connection
        const sql = 'DELETE FROM comment WHERE id=?'; // SQL query to delete a comment
        await db.query(sql, [id]); // Execute the deletion
        db.close(); // Close the database connection
    }

    // Static method to retrieve a comment by its ID from the database.
    static async getById(id: number): Promise<Comment | null> {
        const db = await getDatabaseConnection.create(); // Establish a new database connection
        const sql = 'SELECT * FROM comment WHERE id =?'; // SQL query to select a comment by ID
        return new Promise((resolve, reject) => {
            connection.query<RowDataPacket[]>(sql, [id], (error, results) => {
                db.close(); // Close the database connection
                if (error) reject(error);
                if (results.length > 0) {
                    const r = results[0];
                    // Resolve the promise with a new Comment instance
                    resolve(new Comment(r.id, r.author, r.tweet, r.content));
                } else {
                    resolve(null); // Resolve as null if no comment is found
                }
            });
        });
    }
}
