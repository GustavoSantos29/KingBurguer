import { AppError } from "./appError.error.js";

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}
