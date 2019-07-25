import { Request, Response, NextFunction } from "express";

import { InputValidationError } from "../errors/HttpErrors";

export function validateNameLength(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const name: string = req.body.name;
  if (!name || name.length < 3) {
    throw new InputValidationError(`The name length need to be 3 at least`);
  } else {
    next();
  }
}

export function validateIdLength(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  if (!id || id.length !== 36) {
    throw new InputValidationError("The id length must 36");
  } else {
    next();
  }
}
