import { getDB } from '../db/database';
import fs from 'fs';
import path from "path";
import { User } from "../types/User";

/** Creates the Users table for our application.
 * If the table already exists, it will be dropped to start fresh.
*/
export async function createUsersTable() {
  try {

    const db = await getDB();

    // First, drop the existing table if it exists
    await db.exec("DROP TABLE IF EXISTS Users");

    // Then, create the table
    const query = `
      CREATE TABLE IF NOT EXISTS Users (
        userID INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        password TEXT NOT NULL,
        isAdmin BOOLEAN NOT NULL DEFAULT 0
      );
    `;
    await db.exec(query);

    console.log("Users table successfully created");

  } catch (err) {
    console.error("Error in userModel.ts createUsersTable: ", err);
  }
}

/** Populates the Users table from the users.json file */
export async function populateUsers() {
  try {

    const db = await getDB();

    // Read user data from our JSON file.
    const data = fs.readFileSync(path.join(__dirname, "../data/users.json"), 'utf8');
    const users: User[] = JSON.parse(data);

    const query = `
      INSERT INTO Users (username, firstName, lastName, password, isAdmin)
      VALUES (?, ?, ?, ?, ?)
    `;

    // Using a prepare statement since we will be executing multiple sql statements for this insertion
    const insert = await db.prepare(query);
    for (const user of users) {
      // Insert each user that we read from the JSON file
      await insert.run(user.username, user.firstName, user.lastName, user.password, user.isAdmin ? 1 : 0);
    }
    await insert.finalize(); // make sure to finalize to clean up resources

    console.log('All users have been inserted.');

  } catch (err) {
    console.error("Error in userModel.ts populateUsers: ", err);
  }
}

/**
 * Gets the specified user given their username
 * @param username username of the user
 * @returns The User data if the operation is successful
 */
export async function getUser(username: string): Promise<User | undefined> {
  try {

    const db = await getDB();

    const query = "SELECT * FROM Users WHERE username = ?";
    const user: User | undefined = await db.get(query, [username]);

    console.log("successfully retrieved user");
    return user;

  } catch (err) {
    console.error("Error in userModel.ts getUser: ", err);
    return undefined;
  }
}

