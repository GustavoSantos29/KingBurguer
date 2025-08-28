import { AppError } from "./appError.error.js";

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}
