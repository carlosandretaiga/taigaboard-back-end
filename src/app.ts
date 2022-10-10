import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import router from './routers/index.js';
import { handleError } from './middlewares/errorHandlerMiddleware.js';
import { storage } from './multerConfig.js'


const upload = multer({ storage: storage });

dotenv.config();

const app = express();
app.use(cors(), express.json());
app.use(express.urlencoded({ extended: true }));

//rotas para multer upload de arquivos
app.post("/upload", upload.single('file'), (req: Request, res: Response) => {
  return res.json(req.file.filename);
});

app.use("/files", express.static("uploads"));
//rotas para multer upload de arquivos fim

app.use(router);
app.use(handleError);

export default app;
