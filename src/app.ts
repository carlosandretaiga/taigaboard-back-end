import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routers/index.js';
import { handleError } from './middlewares/errorHandlerMiddleware.js';


dotenv.config();

const app = express();
app.use(cors(), express.json());

app.get("/on-line", (req: Request, res: Response) => {
  res.send("Aplicação on-line");
});

app.use(router);
app.use(handleError);

export default app;
