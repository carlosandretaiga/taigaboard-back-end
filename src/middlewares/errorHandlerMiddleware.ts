import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import { errorTypeToStatusCode, isAppError } from '../utils/errorHandlerUtils.js';

export function handleError(
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(chalk.bold.yellow("Alert: an error occured!", error));

  if(isAppError(error)) {
    const statusCode = errorTypeToStatusCode(error.type);
    res.status(statusCode).send(error.message);
  };

  if(error.details) {
    return res.status(422).send(error.details.map(({ message }: {message: string })=> message));
  };

  res.sendStatus(500);
};