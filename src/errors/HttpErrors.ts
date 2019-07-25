import { NOT_FOUND, BAD_REQUEST } from "http-status-codes";

export abstract class HttpErrors extends Error {
  constructor(public status: number, public message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class InputValidationError extends HttpErrors {
  constructor(message: string) {
    super(BAD_REQUEST, message);
  }
}

export class NotFoundError extends HttpErrors {
  constructor(message: string) {
    super(NOT_FOUND, message);
  }
}
