// Import necessary modules and classes.
import { User } from './user'; // Class that represents a user.
import { Tweet } from './tweet'; // Class that represents a tweet.
import { getDatabaseConnection } from '../database'; // Function to get a database connection.
import mysql, { RowDataPacket } from 'mysql2/promise'; // MySQL library with promise support.
import { ResultSetHeader } from 'mysql2'; // Type for handling result set headers from MySQL operations.
import { connection } from '../app'; // Shared database connection from your application configuration.

// Define a class named `Like` to represent like actions on tweets.
export class Like {
    private id: number; // Private property to store the unique identifier of the like.
    private liker: User; // Stores an instance of the User class, representing the user who liked the tweet.
    private likedTweet: Tweet; // Stores an instance of the Tweet class, representing the tweet that was liked.

    // Constructor for the Like class to initialize a new instance.
    constructor(id: number, liker: User, likedTweet: Tweet) {
        this.id = id; // Set the like's ID.
        this.liker = liker; // Set the user who liked the tweet.
        this.likedTweet = likedTweet; // Set the tweet that was liked.
    }

    // Getter methods to provide read access to the private properties.
    getId(): number {
        return this.id; // Returns the unique identifier of the like.
    }

    getLiker(): User {
        return this.liker; // Returns the user who liked the tweet.
    }

    getLikedTweet(): Tweet {
        return this.likedTweet; // Returns the tweet that was liked.
    }

    // Setter methods to allow modification of the properties.
    setId(id: number): void {
        this.id = id; // Update the identifier of the like.
    }

    setLiker(liker: User): void {
        this.liker = liker; // Update the user who liked the tweet.
    }

    setLikedTweet(likedTweet: Tweet): void {
        this.likedTweet = likedTweet; // Update the tweet that was liked.
    }

    // Static method to create a new like in the database.
    static async create(liker: User, likedTweet: Tweet): Promise<Like> {
        const db = await getDatabaseConnection.create(); // Obtain a database connection.
        const sql = 'INSERT INTO likes (likerId, likedTweetId) VALUES(?,?)'; // SQL query to insert a new like.
        return new Promise((resolve, reject) => {
            connection.query<ResultSetHeader>(sql, [liker.id, likedTweet.id], (err, results) => {
                db.close(); // Close the database connection after the operation.
                if (err) reject(err);
                else resolve(new Like(results.insertId, liker, likedTweet)); // Create a new Like instance and resolve it.
            });
        });
    }

    // Static method to update an existing like.
    static async update(id: number, liker?: User, likedTweet?: Tweet): Promise<void> {
        const db = await getDatabaseConnection.create(); // Obtain a database connection.
        const updates = []; // Array to collect SQL update clauses.
        const params = []; // Array to collect parameters for the SQL query.

        // Add updates and parameters if provided.
        if (liker) {
            updates.push("likerId=?");
            params.push(liker.id);
        }
        if (likedTweet) {
            updates.push("likedTweetId=?");
            params.push(likedTweet.id);
        }
        if (params.length > 0) {
            params.push(id); // Add the like's ID as the last parameter.
            const sql = `UPDATE likes SET ${updates.join(',')} WHERE id =?`; // Build the SQL update query.
            await db.query(sql, params); // Execute the query.
        }
        db.close(); // Close the database connection.
    }

    // Static method to delete a like.
    static async delete(id: number): Promise<void> {
        const db = await getDatabaseConnection.create(); // Obtain a database connection.
        const sql = 'DELETE FROM likes WHERE id=?'; // SQL query to delete a like.
        await db.query(sql, [id]); // Execute the deletion.
        db.close(); // Close the database connection.
    }

    // Static method to retrieve a like by its ID.
    static async getById(id: number): Promise<Like | null> {
        const db = await getDatabaseConnection.create(); // Obtain a database connection.
        const sql = 'SELECT * FROM likes WHERE id =?'; // SQL query to fetch a like.
        return new Promise((resolve, reject) => {
            connection.query<RowDataPacket[]>(sql, [id], (error, results) => {
                db.close(); // Close the database connection.
                if (error) reject(error);
                else if (results.length > 0) {
                    const r = results[0]; // Extract the result if available.
                    resolve(new Like(r.id, r.liker, r.likedTweet)); // Resolve with a new Like instance.
                }
                resolve(null); // If no results, resolve as null.
            });
        });
    }
}
