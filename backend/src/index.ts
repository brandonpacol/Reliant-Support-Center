import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import ticketRouter from './routes/ticketRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api', ticketRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});