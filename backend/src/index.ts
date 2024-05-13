import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import dotenv from 'dotenv';

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

app.use('/api', ticketRouter);
app.use('/api', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});