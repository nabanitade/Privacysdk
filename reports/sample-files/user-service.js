// User Service with Privacy Vulnerabilities
const crypto = require('crypto');

// CRITICAL: Hardcoded API keys and secrets
const STRIPE_SECRET_KEY = "sk_live_1234567890abcdefghijklmnopqrstuvwxyz";
const DATABASE_PASSWORD = "super_secret_password_123";
const JWT_SECRET = "my_jwt_secret_key_that_should_not_be_hardcoded";

// CRITICAL: Hardcoded PII data
const ADMIN_EMAIL = "admin@company.com";
const SUPPORT_PHONE = "555-123-4567";
const DEFAULT_USER_SSN = "123-45-6789";

class UserService {
    constructor() {
        this.users = [];
        this.logFile = "user_activity.log";
    }

    // MEDIUM: Logging sensitive user data
    async createUser(userData) {
        console.log("Creating user with email:", userData.email);
        console.log("User SSN:", userData.ssn); // CRITICAL: Logging SSN
        
        const user = {
            id: crypto.randomBytes(16).toString('hex'),
            email: userData.email,
            ssn: userData.ssn,
            phone: userData.phone,
            address: userData.address
        };
        
        this.users.push(user);
        
        // CRITICAL: Writing sensitive data to log file
        const logEntry = `User created: ${JSON.stringify(user)}`;
        this.writeToLog(logEntry);
        
        return user;
    }

    // MEDIUM: Exposing sensitive data in response
    getUserProfile(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            // CRITICAL: Returning full user data including SSN
            return {
                id: user.id,
                email: user.email,
                ssn: user.ssn, // Should be masked or excluded
                phone: user.phone,
                address: user.address,
                creditCard: user.creditCard // CRITICAL: Exposing credit card data
            };
        }
        return null;
    }

    // LOW: Weak encryption
    encryptUserData(data) {
        // CRITICAL: Using weak encryption algorithm
        const cipher = crypto.createCipher('aes-128-ecb', JWT_SECRET);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    // CRITICAL: SQL injection vulnerability
    findUserByEmail(email) {
        const query = `SELECT * FROM users WHERE email = '${email}'`;
        // This is vulnerable to SQL injection
        return this.executeQuery(query);
    }

    writeToLog(message) {
        // CRITICAL: Writing to file without proper access controls
        require('fs').appendFileSync(this.logFile, message + '\n');
    }

    executeQuery(query) {
        // Placeholder for database execution
        console.log("Executing query:", query);
        return [];
    }
}

module.exports = UserService; 