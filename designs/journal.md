# Design Journal
This journal will be used to document the various design choices that may not necessarily be seen through the commit history. Before going straight into coding, I believe it's best to draft out the roadmap of the solution. I hope this document can give you greater context into my thought process for completing this project.

## Database Design
The first step I take into designing an application is to see what kind of data I'm dealing with and structuring the data according to requirements.
This application is handling a user ticketing system, so the two types of data we'll have are users and tickets. I have decided to go with a SQL database for this project, so we will have a "users" table and a "tickets" table to store our information. Below is a graph of the columns that each table will hold. Since one user can generate several tickets, there is a one to many relationship between the two.

## Client-Server Interactions
Next, I need to understand how the client and server will interact with each other given the endpoints that we need. Below are diagrams I created to illustrate the workflow.

- POST /tickets to submit a new ticket.
- GET /tickets to retrieve all tickets.
- GET /tickets/{id} to retrieve a specific ticket's details.
- PUT /tickets/{id} to update a ticket’s status.

## Drafting UI Layout
Before coding the UI, it's important to have a general idea for how the layouts should look like. The below images are initial drafts I had set up to give me and outline of what I would like each page to look like. Further details can be added as we dive deeper into the project.