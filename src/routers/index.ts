import { Router, Request, Response } from 'express';
import authRouter from './authRouter.js';
import multer from 'multer';

import { multerConfig } from '../config/multer.js';

const router = Router();
router.use(authRouter);

router.get("/on-line", (req: Request, res: Response) => {
  return res.send("Aplicação on-line de boas");
});

router.post("/posts", multer(multerConfig).single('file'), (req: Request, res: Response) => {
  console.log(req.file);
  return res.json({ hello: "TaigaBoard" });

});

export default router;