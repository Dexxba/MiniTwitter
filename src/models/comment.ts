// Import the User class from the user module, which likely defines user-related properties and methods.
import { User } from './user';

// Import the Tweet class from the tweet module, which likely encapsulates data and operations for a tweet.
import { Tweet } from './tweet';

// Define a new TypeScript class named `Comment` that represents comments made on tweets.
export class Comment {
    // Private properties of the class, only accessible within this class.
    private id: number;       // Stores the unique identifier for the comment.
    private author: User;     // Stores an instance of the User class, representing the author of the comment.
    private tweet: Tweet;     // Stores an instance of the Tweet class, representing the tweet this comment is associated with.
    private content: string;  // Stores the text content of the comment.

    // Constructor method: called when a new instance of Comment is created.
    constructor(id: number, author: User, tweet: Tweet, content: string) {
        this.id = id;             // Initialize the id property with the provided id.
        this.author = author;     // Initialize the author property with the provided User object.
        this.tweet = tweet;       // Initialize the tweet property with the provided Tweet object.
        this.content = content;   // Initialize the content property with the provided text content.
    }

    // Getter methods - these methods provide read-only access to the properties.
    getId(): number {
        return this.id;  // Returns the comment's id.
    }

    getAuthor(): User {
        return this.author;  // Returns the author of the comment as a User object.
    }

    getTweet(): Tweet {
        return this.tweet;  // Returns the tweet associated with the comment as a Tweet object.
    }

    getContent(): string {
        return this.content;  // Returns the text content of the comment.
    }

    // Setter methods - these methods allow properties to be updated after an object's instantiation.
    setId(id: number): void {
        this.id = id;  // Updates the comment's id.
    }

    setAuthor(author: User): void {
        this.author = author;  // Updates the author of the comment, with a new User object.
    }

    setTweet(tweet: Tweet): void {
        this.tweet = tweet;  // Updates the tweet associated with the comment, with a new Tweet object.
    }

    setContent(content: string): void {
        this.content = content;  // Updates the text content of the comment.
    }
}
