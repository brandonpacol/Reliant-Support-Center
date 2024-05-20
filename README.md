# Reliant Mission Support
This demo project is a ticket support center system for Reliant Mission. In this project, I hope to demonstract my full stack abilities to design and develop a system from the database, server, and client side aspects.

## Overview
Upon launching the website, you will be greeted with a login screen.
![Login Page](https://github.com/brandonpacol/Reliant-Support-Center/blob/main/readme/01-LoginPage.png)

After entering your credentials, you will see your tickets home page. Here, you can filter tickets by status and priority. Users will only be able to see their tickets. Admins can see ALL tickets and update them accordingly.
![Tickets Page](https://github.com/brandonpacol/Reliant-Support-Center/blob/main/readme/02-TicketsPage.png)

Pressing on a ticket from the ticket's table will bring you to the details page of the Ticket. You can view the full description of the ticket on this page. Only admins will be able to update the status of the ticket.

Regular user view:
![Ticket Details Page](https://github.com/brandonpacol/Reliant-Support-Center/blob/main/readme/03-TicketDetailsPage.png)

Admin view:
![Ticket Details Page - Admin](https://github.com/brandonpacol/Reliant-Support-Center/blob/main/readme/04-TicketDetailsPage-Admin.png)

Pressing on the "New Ticket" button from the tickets page will open the Ticket Submission page. You can enter details such as the subject, description, and priority to submit a new ticket.
![Ticket Submission Page](https://github.com/brandonpacol/Reliant-Support-Center/blob/main/readme/05-TicketSubmissionPage.png)

Pressing "Logout" at any point will log you out of the session and you will need to sign in again.

## Instructions
After cloning the git repo, you will need to run the following commands to start the project.
1. npm run init
2. npm run build
3. npm run start
4. Open http://localhost:3000 to start using the application!

You may log in with the following usernames:
- brandon (admin user)
- john
- ben

All users have the password "password". This should not be a valid password in a production environment, but this was the simplest way to generate users in my database to have this demo project running.

## Technologies and Design
The following technologies were used to develop this project
- Database: SQLite - I went with SQLite as the database for this project since it requires minimal setup when sharing the project. There isn't any need to download or set up software like with MongoDB. Using SQL also made it easier to join data since it is a relational database.

- Server: Express with Typescript - When choosing the server side tool, I had debated between using Next.js or Express. I decided to go with Express to clearly show the separation of concerns between the backend and frontend components, and demonstrate that I can clearly develop both sides without relying on the pattern of Next.js which encompasses both. I used Typescript for typing variables which made development easier for readability and catching type errors before runtime.

- Client: React with Typescript - I decided to go with React as it is the front-end framework I am most comfortable developing in. I used Typescript as well for the same reasons as the server side since it made the code more readabable and I was able to catch type errors before runtime.

Before coding, I created a short design journal located in designs/journal.md to document my plan before executing any code. For a full look into my thought process there, you can visit that page.

Thank you for the opportunity to do this project! I look forward to speaking with you for more details on how I accomplished this.
