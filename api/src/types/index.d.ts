declare namespace Express {
  export interface Request {
    user?: {
      id: number;
    };
    admin?: {
      id: number;
    };
  }
}
