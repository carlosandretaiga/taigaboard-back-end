import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors(), express.json());

app.get("/on-line", (req: Request, res: Response) => {
  res.send("Aplicação on-line");
});

export default app;
