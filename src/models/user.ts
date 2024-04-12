// Import the necessary modules and types from external libraries and local files.
import { getDatabaseConnection } from '../database'; // To get a connection to the database
import { ResultSetHeader } from 'mysql2'; // Type used to describe the result header from a MySQL operation
import bcrypt from 'bcryptjs'; // For hashing passwords securely
import mysql, { RowDataPacket } from 'mysql2/promise'; // MySQL library with promise support
import { connection } from '../app'; // Database connection from the application setup

// Define a class to represent a User in the system.
export class User {
    id: number; // User's unique identifier
    private username: string; // User's username, private to encapsulate and restrict direct access
    private email: string; // User's email, private to encapsulate and restrict direct access
    private password: string; // User's hashed password, private to ensure security
    private isAdmin: boolean; // Flag to determine if the user has admin privileges

    // Constructor to initialize a User object with provided attributes.
    constructor(id: number, username: string, email: string, password: string, isAdmin: boolean) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }

    // Static method to create a new user and insert it into the database.
    static async create(username: string, email: string, password: string, isAdmin: boolean): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const db = await getDatabaseConnection.create(); // Obtain a new database connection
        const sql = 'INSERT INTO user (username, email, password, isAdmin) VALUES (?, ?, ?, ?)'; // SQL query
        return new Promise((resolve, reject) => {
            connection.query<ResultSetHeader>(sql, [username, email, hashedPassword, isAdmin], (error, results) => {
                db.close(); // Close the database connection
                resolve(new User(results.insertId, username, email, hashedPassword, isAdmin)); // Resolve the promise with the new user
            });
        });
    }

    // Static method to update an existing user's details in the database.
    static async update(id: number, username?: string, email?: string, password?: string, isAdmin?: boolean): Promise<void> {
        const db = await getDatabaseConnection.create(); // Obtain a new database connection
        const updates = []; // Array to hold parts of the SQL update query
        const params = []; // Array to hold parameter values for the SQL query
        if (username) {
            updates.push('username = ?');
            params.push(username);
        }
        if (email) {
            updates.push('email = ?');
            params.push(email);
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updates.push('password = ?');
            params.push(hashedPassword);
        }
        if (isAdmin !== undefined) {
            updates.push('isAdmin = ?');
            params.push(isAdmin);
        }
        if (params.length > 0) {
            params.push(id); // Add the user ID as the last parameter
            const sql = `UPDATE user SET ${updates.join(', ')} WHERE id = ?`; // Construct the SQL update query
            await db.query(sql, params); // Execute the query
        }
        db.close(); // Close the database connection
    }

    // Static method to delete a user from the database by ID.
    static async delete(id: number): Promise<void> {
        const db = await getDatabaseConnection.create(); // Obtain a new database connection
        const sql = 'DELETE FROM user WHERE id = ?'; // SQL query to delete user
        await db.query(sql, [id]); // Execute the query
        db.close(); // Close the database connection
    }

    // Static method to retrieve a user by ID from the database.
    static async getById(id: number): Promise<User | null> {
        const db = await getDatabaseConnection.create(); // Obtain a new database connection
        const sql = 'SELECT * FROM user WHERE id = ?'; // SQL query to fetch user details
        return new Promise((resolve, reject) => {
            connection.query<RowDataPacket[]>(sql, [id], (error, results) => {
                db.close(); // Close the database connection
                if (results.length > 0) {
                    const r = results[0]; // Take the first result row
                    resolve(new User(r.id, r.username, r.email, r.password, r.isAdmin)); // Resolve the promise with the user
                }
                resolve(null); // If no results, resolve the promise with null
            });
        });
    }
}
