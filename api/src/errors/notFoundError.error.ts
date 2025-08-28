import { AppError } from "./appError.error.js";

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}
