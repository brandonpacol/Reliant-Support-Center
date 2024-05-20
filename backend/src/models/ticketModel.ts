import { getDB } from "../db/database";
import fs from 'fs';
import path from "path";
import { User } from "../types/User";
import { Ticket, Status, Priority } from "../types/Ticket";

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

/**
 * Submits a ticket to the DB
 * @param userID ID of the user submitting the ticket
 * @param title Title of the ticket
 * @param description Description of the ticket
 * @param priority Priority of the Ticket
 * @returns Boolean of whether the ticket submission was successful
 */
export async function submitTicket(userID: number, title: string, description: string, priority: Priority): Promise<boolean> {
  try {

    const db = await getDB();

    const query = `
      INSERT INTO Tickets (userID, title, description, priority, status, createdTime, updatedTime)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const currentDate = new Date(Date.now()).toISOString();
    const result = await db.run(query, [userID, title, description, priority, Status.Open, currentDate, currentDate]);

    console.log('Successfully added ticket');
    
    // Return a success if there were changes made to the DB
    if (result.changes && result.changes > 0) {
      return true;
    } else {
      return false;
    }

  } catch (err) {
    console.error("Error in ticketModel.ts submitTicket: ", err);
    return false;
  }
}

/**
 * Gets all tickets from the DB
 * @param user The current user requesting the tickets
 * @param status The status of the tickets to filter by
 * @param priority The priority of the tickets to filter by
 * @returns An array of Ticket data if the operation is successful
 */
export async function getTickets(user: User, status?: string, priority?: string): Promise<Ticket[] | undefined> {
  try {

    const db = await getDB();

    // Create initial query
    let query = `
      SELECT Tickets.*, Users.userID,  Users.username,  Users.firstName, Users.lastName
      FROM Tickets
      INNER JOIN Users ON Tickets.userID = Users.userID`
    ;

    // Append conditions if necessary
    let conditions = [];
    if (!user.isAdmin) { // if the user is not an admin, only get their tickets
      if (user.userID) {
        conditions.push(`Users.userID = ?`);
      } else {
        return undefined; // Don't return anything if we can't get the userID. Shouldn't get hit here.
      }
    }
    if (status) {
      conditions.push(`Tickets.status = ?`);
    }
    if (priority) {
      conditions.push(`Tickets.priority = ?`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    // Finally, sort by the updated time
    query += ' ORDER BY Tickets.updatedTime DESC';

    // Prepare the query with the parameters
    const getStatement = await db.prepare(query);

    const params: (string | number)[] = [];
    if (!user.isAdmin) {
      if (user.userID) {
        params.push(user.userID);
      } else {
        return undefined; // Don't return anything if we can't get the userID. Shouldn't get hit here.
      }
    }
    if (status) {
      params.push(status);
    }
    if (priority) {
      params.push(priority);
    }

    const tickets: Ticket[] = await getStatement.all(params);

    console.log("successfully retrieved tickets");
    return tickets;

  } catch (err) {
    console.error("Error in ticketModel.ts getTickets: ", err);
    return undefined;
  }
}

/**
 * Gets the specified ticket given the ticketID
 * @param ticketID ID of the ticket to grab
 * @returns The Ticket data if the operation is successful
 */
export async function getTicket(ticketID: number): Promise<Ticket | undefined> {
  try {

    const db = await getDB();

    const query = `
      SELECT Tickets.*, Users.userID,  Users.username,  Users.firstName, Users.lastName
      FROM Tickets
      INNER JOIN Users ON Tickets.userID = Users.userID
      WHERE ticketID = ?`
    const ticket: Ticket | undefined = await db.get(query, [ticketID]);

    console.log("successfully retrieved ticket");
    return ticket;
    
  } catch (err) {
    console.error("Error in ticketModel.ts getTicket: ", err);
    return undefined;
  }
}

/**
 * Updates the status of the specified ticketID
 * @param ticketID ID of the ticket to update
 * @param status The status to update the ticket to
 * @returns A boolean of whether the update was successful or not
 */
export async function updateTicket(ticketID: number, status: Status): Promise<boolean> {
  try {

    const db = await getDB();

    const query = `
      UPDATE Tickets
      SET status = ?, updatedTime = ?
      WHERE ticketID = ?
    `;

    const updatedTime = new Date(Date.now()).toISOString();
    const result = await db.run(query, [status, updatedTime, ticketID]);

    console.log("successfully updated ticket");

    // Return a success if there were changes made to the DB
    if (result.changes && result.changes > 0) {
      return true;
    } else {
      return false;
    }

  } catch (err) {
    console.error("Error in ticketModel.ts updateTicket: ", err);
    return false;
  }
}