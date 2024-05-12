import { getDB } from "../db/database";

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
          userID INTEGER FOREIGN KEY REFERENCES Users(userID),
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          priority INTEGER NOT NULL,
          status TEXT NOT NULL,
          createdTime TEXT NOT NULL,
          updatedTime TEXT NOT NULL
      );
    `;
    await db.exec(query);

    console.log("Tickets table successfully created");

  } catch (err) {
    console.error("Error in ticketModel.ts createTicketsTable: ", err);
  }
}