import { createUsersTable, populateUsers } from "./models/userModel";

/** Initializes and populates the tables in our application. */
async function initialize() {
  try {
    await createUsersTable();
    await populateUsers();
  } catch (err) {
    console.error("Error in initialize.ts: ", err);
  }
}

initialize();