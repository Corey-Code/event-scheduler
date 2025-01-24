import { Request, Response, NextFunction } from 'express';

//
// Type it out
interface ErrorResponse {
  status: number;
  message: string;
}

//
// Make the handler
export const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('DEBUG [errorHandler.ts] (errHandler) -err', err);

  const statusCode = err.status || 500;
  const message = err.message || 'Something went wrong';

  res.status(statusCode).json({ status: statusCode, message });
};
