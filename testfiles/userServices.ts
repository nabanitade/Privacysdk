mport { Logger } from '../utils/logger';
import { db } from '../db';
import { UserData } from '../types';

export class UserService {
  async createUser(userData: UserData) {
    // Validate input
    if (!userData.email) throw new Error("Email required");

    // VIOLATION 1: Logging PII (Email + Phone) to console/logs
    console.log("Creating new user with data:", JSON.stringify(userData));
    Logger.info(`Processing sign-up for ${userData.email} / ${userData.phone}`);

    // VIOLATION 2: Indefinite retention (no TTL or expiration policy)
    // Storing raw user data without encryption or retention limits
    const result = await db.users.insert({
      ...userData,
      createdAt: new Date(),
      status: 'active'
    });
    
    return result;
  }

  async getUser(id: string) {
    return await db.users.findById(id);
  }
  
  // VIOLATION 3: Missing deleteUser / DSAR handler
  // No mechanism to process "Right to be Forgotten" requests
}