import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';

import ticketRouter from './routes/ticketRoutes';
import userRouter from './routes/userRoutes';

dotenv.config();
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET is not set in the environment variables');
}

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: 'auto', httpOnly: true, maxAge: 3600000 }
}));

app.use('/api', userRouter);
app.use('/api', ticketRouter);

// Serve static files from the dist folder build of the react app
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Serve index.html for all routes to support routing
app.get('*', checkUserIsAuthenticated, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Don't allow users to enter other pages if they are not authenticated.
function checkUserIsAuthenticated(req: Request, res: Response, next: Function) {
  if (req.path !== "/" && !req.session.user) {
    console.log("redirecting to login");
    return res.redirect("/");
  }
  next();
}