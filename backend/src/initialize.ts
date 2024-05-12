import { createUsersTable, populateUsers } from "./models/userModel";
import { createTicketsTable, populateTickets } from "./models/ticketModel";

/** Initializes and populates the tables in our application. */
async function initialize() {
  try {
    await createUsersTable();
    await populateUsers();
    await createTicketsTable();
    await populateTickets();
  } catch (err) {
    console.error("Error in initialize.ts: ", err);
  }
}

initialize();