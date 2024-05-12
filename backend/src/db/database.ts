import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

/** Holds the DB object we will use throughout our application. */
let db: Database | null = null;

/** Gets the DB object used throughout our application. 
 * If the DB is not opened, this function will open the DB connection.
 * If it is already open, we will just return the DB object.
*/
export async function getDB(): Promise<Database> {
    if (!db) { // only open the db if it doesn't exist yet
      db = await open({
        filename: './main.db',
        driver: sqlite3.Database
      });
      // Enable foreign key constraint
      await db.exec("PRAGMA foreign_keys = ON");
    }
    return db;
}