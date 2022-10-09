import { Router } from 'express';

import { signupSchema, signinSchema } from '../schemas/userSchema.js';
import { validateSchema } from '../middlewares/validateSchema.js';

import { registerUser, loginUser } from '../controllers/userController.js';

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signupSchema), registerUser);
authRouter.post("/sign-in", validateSchema(signinSchema), loginUser);

export default authRouter;