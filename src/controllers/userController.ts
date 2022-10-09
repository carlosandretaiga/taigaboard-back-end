import { Request, Response } from 'express';

import * as userService from '../services/userService.js';


export async function registerUser(req: Request, res: Response){
  const { name, email, password, confirmPassword }: { name: string, email: string, password: string, confirmPassword: string } = req.body;

  const createdUser = await userService.registerUser({ name, email, password, confirmPassword });

  createdUser.password = password;

  res.status(201).send(createdUser);
};

export async function loginUser(req: Request, res: Response) {
  const { email, password }: { email: string, password: string } = req.body;

  console.log(req.body);

  const token = await userService.loginUser({ email, password });

  res.status(200).send({ token });
};