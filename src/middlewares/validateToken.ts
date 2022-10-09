import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { unautorizedError } from '../utils/errorHandlerUtils.js';

export function validateToken(req: Request, res: Response, next: NextFunction){
  const { authorization } = req.headers;
  const JWT_TOKEN = process.env.JWT_TOKEN;
  const hashBearer = authorization?.match(/Bearer/);
  const token = authorization?.replace("Bearer", "").trim();

  if(!hashBearer){
    throw unautorizedError(
      "Autorization header must have Bearer at the beginning!",
    )
  };

  if(!token){
    throw unautorizedError(
      "You need to pass an authorization token in the request header!",
    )
  };

  try {
    const tokenData = JSON.stringify(jwt.verify(token, JWT_TOKEN));
    const parseData: { email: string } = JSON.parse(tokenData);
    res.locals.user = { email: parseData.email };
  } catch (error) {
    throw unautorizedError("Wrong or expired token!");
  }

  next();
};