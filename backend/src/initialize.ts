import { createUsersTable, populateUsers } from "./models/userModel";
import { createTicketsTable } from "./models/ticketModel";

/** Initializes and populates the tables in our application. */
async function initialize() {
  try {
    await createUsersTable();
    await populateUsers();
    await createTicketsTable();
  } catch (err) {
    console.error("Error in initialize.ts: ", err);
  }
}

initialize();