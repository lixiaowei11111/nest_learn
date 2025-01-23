import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('[debug] error middleware');
  next();
}
