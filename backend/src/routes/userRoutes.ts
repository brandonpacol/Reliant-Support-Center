import express, { Request, Response } from 'express';
import { getUser } from '../models/userModel';

/** Represents the body passed to the user api requests */
interface UserRequestBody {
  username?: string;
  password?: string;
}

const userRouter = express.Router();

// POST /login
// Logs the user in given their username and password
userRouter.post('/login', async (req: Request, res: Response) => {
  try {
    if (req.session.user) { // If user is already logged in, send success message

      res.status(200).send("User is already logged in.");

    } else { // else, attempt the authenticate the login

      const body: UserRequestBody = req.body;

      const username = body.username;
      const password = body.password;

      if (username && password) { // only proceed if there is a valid username and password

        // Get the associated user and check their password
        const user = await getUser(username);
        if (user && user.password === password) {
          req.session.user = user; // assign this session's user upon successful login
          res.status(200).send("Login successful.");
        } else {
          res.status(401).send("Invalid username or password.");
        }

      } else {
        res.status(400).send("Invalid request.");
      }

    }

  } catch (err) {
    console.error("Error in userRoutes.ts POST /login : " + err);
    res.status(500).send("Failed to log in user: " + err);
  }
});

// POST /logout
// Logs out the user if they are currently signed in
userRouter.post('/logout', async (req: Request, res: Response) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Failed to log out user. Please try again.");
      }
      res.status(200).send("Logout successful.");
    });
  } catch (err) {
    console.error("Error in userRoutes.ts POST /logout : " + err);
    res.status(500).send("Failed to log out user: " + err);
  }
});

export default userRouter;