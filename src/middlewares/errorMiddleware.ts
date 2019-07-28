import { Request, Response, NextFunction } from 'express';
import { HttpErrors } from '../errors/HttpErrors';

export function ErrorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof HttpErrors) {
    return res.status(error.status).send(error.message);
  } else {
    next(error);
  }
}
