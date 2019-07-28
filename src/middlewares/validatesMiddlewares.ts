import { Request, Response, NextFunction } from 'express';
import { InputValidationError } from '../errors/HttpErrors';
import Joi from 'joi';

const idValidationSchema = Joi.object().keys({
  id: Joi.string()
    .regex(
      /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/
    )
    .required()
});
const nameValidationSchema = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .regex(/^[a-zA-Z]/)
    .required()
});
export function validateNameLength(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = Joi.validate({ name: req.body.name }, nameValidationSchema);
  if (result.error) {
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
  const result = Joi.validate({ id: req.params.id }, idValidationSchema);
  if (result.error) {
    throw new InputValidationError('The id length must 36');
  } else {
    next();
  }
}
