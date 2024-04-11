// Importing the User class from the 'user' module to use it as the type for the author property.
import { User } from './user';

// The Tweet class models the structure and behavior of a tweet in our application.
export class Tweet {
    // Private properties to encapsulate the tweet's id, content, and author details.
    private id: number;
    private content: string;
    private author: User;

    // Constructor for creating a new instance of a Tweet.
    // It requires an id, content of the tweet, and an author of type User.
    constructor(id: number, content: string, author: User) {
        this.id = id; // Sets the id of the tweet.
        this.content = content; // Sets the content of the tweet.
        this.author = author; // Sets the author of the tweet, using the User class for detailed user information.
    }

    // Getter method for the tweet's id.
    // Returns the id of the tweet.
    getId(): number {
        return this.id;
    }

    // Getter method for the tweet's content.
    // Returns the content of the tweet as a string.
    getContent(): string {
        return this.content;
    }

    // Getter method for the tweet's author.
    // Returns the User object representing the author of the tweet.
    getAuthor(): User {
        return this.author;
    }

    // Setter method for the tweet's id.
    // Allows setting a new id for the tweet.
    setId(id: number): void {
        this.id = id;
    }

    // Setter method for the tweet's content.
    // Allows setting new content for the tweet.
    setContent(content: string): void {
        this.content = content;
    }

    // Setter method for the tweet's author.
    // Allows changing the author of the tweet by passing a new User object.
    setAuthor(author: User): void {
        this.author = author;
    }
}
