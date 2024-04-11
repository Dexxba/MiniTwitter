// Define a class named User with private fields to encapsulate user data
export class User { 
    // Declare private fields for the User class
    private id : number;         // Unique identifier for the user
    private username: string;    // Username of the user
    private email: string;       // Email address of the user
    private password: string;    // Password for user authentication (should be hashed in practical applications)
    private isAdmin: boolean;    // Flag to check if the user has administrative privileges

    // Constructor for the User class, initializes a new user object with provided values
    constructor (id: number, username: string, email: string, password: string, isAdmin: boolean) {
        // Assigning values to the class fields using parameters passed to the constructor
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }

    // Getter methods - these provide read access to private fields

    // Returns the user's ID
    getId(): number {
        return this.id;
    }

    // Returns the user's username
    getUsername(): string {
        return this.username;
    }

    // Returns the user's email
    getEmail(): string {
        return this.email;
    }

    // Returns the user's password
    getPassword(): string {
        return this.password;
    }

    // Returns whether the user is an admin
    getIsAdmin(): boolean {
        return this.isAdmin;
    }

    // Setter methods - these allow modification of private fields

    // Sets a new ID for the user
    setId(id: number): void {
        this.id = id;
    }

    // Sets a new username for the user
    setUsername(username: string): void {
        this.username = username;
    }

    // Sets a new email for the user
    setEmail(email: string): void {
        this.email = email;
    }

    // Sets a new password for the user
    setPassword(password: string): void {
        this.password = password;
    }

    // Sets or unsets the user's admin status
    setIsAdmin(isAdmin: boolean): void {
        this.isAdmin = isAdmin;
    }
}
