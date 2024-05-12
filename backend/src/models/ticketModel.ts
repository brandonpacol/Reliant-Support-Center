import { getDB } from "../db/database";
import fs from 'fs';
import path from "path";
import { Ticket } from "../types/Ticket";

/** Creates the Tickets table for our application.
 * If the table already exists, it will be dropped to start fresh.
*/
export async function createTicketsTable() {
  try {

    const db = await getDB();

    // First, drop the existing table if it exists
    await db.exec("DROP TABLE IF EXISTS Tickets");

    // Then, create the table
    const query = `
      CREATE TABLE IF NOT EXISTS Tickets (
        ticketID INTEGER PRIMARY KEY AUTOINCREMENT,
        userID INTEGER,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        priority INTEGER NOT NULL,
        status TEXT NOT NULL,
        createdTime TEXT NOT NULL,
        updatedTime TEXT NOT NULL,
        FOREIGN KEY (userID) REFERENCES Users(userID)
      );
    `;
    await db.exec(query);

    console.log("Tickets table successfully created");

  } catch (err) {
    console.error("Error in ticketModel.ts createTicketsTable: ", err);
  }
}

/** Populates the Tickets table from the tickets.json file */
export async function populateTickets() {
  try {

    const db = await getDB();

    // Read ticket data from our JSON file.
    const data = fs.readFileSync(path.join(__dirname, "../data/tickets.json"), 'utf8');
    const tickets: Ticket[] = JSON.parse(data);

    const query = `
      INSERT INTO Tickets (userID, title, description, priority, status, createdTime, updatedTime)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Using a prepare statement since we will be executing multiple sql statements for this insertion
    const insert = await db.prepare(query);
    for (const ticket of tickets) {
      // Insert each user that we read from the JSON file
      await insert.run(ticket.userID, ticket.title, ticket.description, ticket.priority, ticket.status, ticket.createdTime, ticket.updatedTime);
    }
    await insert.finalize(); // make sure to finalize to clean up resources

    console.log('All tickets have been inserted.');

  } catch (err) {
    console.error("Error in ticketModel.ts populateTickets: ", err);
  }
}