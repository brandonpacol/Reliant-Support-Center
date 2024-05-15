import express, { Request, Response } from 'express';
import { getTicket, getTickets, submitTicket, updateTicket } from '../models/ticketModel';
import { Status, Priority } from '../types/Ticket';

/** Represents the body passed to the ticket api requests. */
interface TicketRequestBody {
  ticketID?: number;
  status?: Status;
  userID?: number;
  title?: string;
  description?: string;
  priority?: Priority
}

const ticketRouter = express.Router();

ticketRouter.use(checkUserIsAuthenticated);

// POST /tickets request
// Request body must contain the userID, title, description, and priority
ticketRouter.post('/tickets', async (req: Request, res: Response) => {
  try {
    
    const body: TicketRequestBody = req.body;

    const userID = req.session.user?.userID;
    const title = body.title;
    const description = body.description;
    const priority = body.priority;

    // Validate that all params are present
    // Adding a strict priority check to validate value during runtime.
    if (userID && title && description && priority && Object.values(Priority).includes(priority)) {

      const result = await submitTicket(userID, title, description, priority);
      
      if (result) {
        res.status(200).send("Added ticket successfully.");
      } else {
        res.status(400).send("Error submitting ticket.");
      }

    } else {
      res.status(400).send('Invalid request.');
    }

  } catch (err) {
    console.error("Error in POST /tickets : " + err);
    res.status(500).send("Error submitting ticket: " + err);
  }
});

// GET /tickets request
ticketRouter.get('/tickets', async (req: Request, res: Response) => {
  try {
    
    const result = await getTickets();

    if (result) {
      res.json(result);
    } else {
      res.status(404).send("Tickets not found.");
    }

  } catch (err) {
    console.error("Error in GET /tickets : " + err);
    res.status(500).send("Error retrieving tickets: " + err);
  }
});

// GET /tickets/{id} request
ticketRouter.get('/tickets/:id', validateTicketID, async (req: Request, res: Response) => {
  try {

    const body: TicketRequestBody = req.body;
    const id = body.ticketID;

    if (id) { // Validate that an ID number is present
      
      const result = await getTicket(id);

      if (result) {
        res.json(result);
      } else {
        res.status(404).send("Ticket not found.")
      }

    } else {
      res.status(400).send("Invalid request.");
    }

  } catch (err) {
    console.error("Error in GET /tickets/:id : " + err);
    res.status(500).send("Error retrieving ticket: " + err);
  }
});

// PUT /tickets/{id} request
// Request body must contain the updated status
ticketRouter.put('/tickets/:id', validateTicketID, async (req: Request, res: Response) => {
  try {

    const body: TicketRequestBody = req.body;

    const id = body.ticketID;
    const status = body.status;

    // Validate that all params are present and valid.
    // Including a strict status check to validate status values during runtime.
    if (id && status && Object.values(Status).includes(status)) {

      const result = await updateTicket(id, status);

      if (result) {
        res.status(200).send("Updated ticket successfully.");
      } else {
        res.status(404).send("Ticket not found.");
      }

    } else {
      res.status(400).send("Invalid request.");
    }

  } catch (err) {
    console.error("Error in PUT /tickets/:id : " + err);
    res.status(500).send("Error updating ticket: " + err);
  }
});

function checkUserIsAuthenticated(req: Request, res: Response, next: Function) {
  if (!req.session.user) return res.status(401).send("Unauthorized.");
  next();
}

/** Middleware which validates that the ticketID is a number and adds it to the request body. */
function validateTicketID(req: Request, res: Response, next: Function) {
  try {

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send("Invalid ticket ID.");
    }
    req.body.ticketID = id; // append id to the body after validating
    next();

  } catch (err) {
    console.error("Error in ticketRoutes.ts validateTicketID: " + err);
    return res.status(500).send("Error validating ticket ID: " + err);
  }
}

export default ticketRouter;