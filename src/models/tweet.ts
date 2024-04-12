// Import necessary modules and classes.
import { getDatabaseConnection } from '../database'; // To handle database connections
import { User } from './user'; // User class to represent the author of the tweet
import mysql, { RowDataPacket } from 'mysql2/promise'; // Import mysql with promise support for asynchronous database operations
import { ResultSetHeader } from 'mysql2'; // Type definition for MySQL results
import { connection } from '../app'; // Database connection instance from your application setup

// The Tweet class models the structure and behavior of a tweet.
export class Tweet {
    // Private properties to ensure encapsulation and data integrity.
    id: number; // Unique identifier for the tweet
    private content: string; // Text content of the tweet
    private author: User; // Author of the tweet, represented by a User object

    // Constructor for initializing a new tweet object with required properties.
    constructor(id: number, content: string, author: User) {
        this.id = id; // Set the tweet's ID
        this.content = content; // Set the tweet's content
        this.author = author; // Set the tweet's author
    }

    // Getter methods provide read access to private properties.
    getId(): number {
        return this.id; // Return the tweet's ID
    }

    getContent(): string {
        return this.content; // Return the tweet's content
    }

    getAuthor(): User {
        return this.author; // Return the User object representing the tweet's author
    }

    // Setter methods provide controlled modification of the properties.
    setId(id: number): void {
        this.id = id; // Set a new ID for the tweet
    }

    setContent(content: string): void {
        this.content = content; // Set new content for the tweet
    }

    setAuthor(author: User): void {
        this.author = author; // Change the author of the tweet
    }

    // Static method to create and insert a new tweet into the database.
    static async create(content: string, author: User): Promise<Tweet> {
        const db = await getDatabaseConnection.create(); // Obtain a database connection
        const sql = 'INSERT INTO tweet (content, authorId) VALUES(?,?)'; // SQL query for inserting a tweet
        return new Promise((resolve, reject) => {
            connection.query<ResultSetHeader>(sql, [content, author.id], (error, results) => {
                db.close(); // Close the database connection
                resolve(new Tweet(results.insertId, content, author)); // Resolve the promise with the newly created tweet
            });
        });
    }

    // Static method to update an existing tweet.
    static async update(id: number, content?: string, author?: User): Promise<void> {
        const db = await getDatabaseConnection.create(); // Obtain a database connection
        const updates = []; // Array to accumulate update clauses
        const params = []; // Parameters for the SQL query

        if (content) {
            updates.push('content=?');
            params.push(content);
        }
        if (author) {
            updates.push('authorId=?');
            params.push(author.id);
        }
        if (params.length > 0) {
            params.push(id); // Add the tweet ID as the last parameter
            const sql = `UPDATE tweet SET ${updates.join(',')} WHERE id =?`; // Build the SQL update query
            await db.query(sql, params); // Execute the query
        }
        db.close(); // Close the database connection
    }

    // Static method to delete a tweet by ID.
    static async delete(id: number): Promise<void> {
        const db = await getDatabaseConnection.create(); // Obtain a database connection
        const sql = 'DELETE FROM tweet WHERE id=?'; // SQL query to delete a tweet
        await db.query(sql, [id]); // Execute the query
        db.close(); // Close the database connection
    }

    // Static method to retrieve a tweet by ID from the database.
    static async getById(id: number): Promise<Tweet | null> {
        const db = await getDatabaseConnection.create(); // Obtain a database connection
        const sql = 'SELECT * FROM tweet WHERE id =?'; // SQL query to fetch a tweet
        return new Promise((resolve, reject) => {
            connection.query<RowDataPacket[]>(sql, [id], (error, results) => {
                db.close(); // Close the database connection
                if (results.length > 0) {
                    const r = results[0]; // Take the first result row
                    resolve(new Tweet(r.id, r.content, r.author)); // Resolve with the tweet object
                }
                resolve(null); // If no results, resolve with null
            });
        });
    }
}
