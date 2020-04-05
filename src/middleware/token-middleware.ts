import jwt from 'jsonwebtoken';
import unless from 'express-unless';
import { Request, Response, NextFunction } from 'express';

const TokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['x-api-key'] as string;

  if (token) {
    try {
      const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
      // @ts-ignore
      req.decoded = decoded;
      next();
    } catch (e) {
      next(new Error('Invalid Token'));
    }
  } else {
    next(new Error('No Token Provided'));
  }
};

TokenMiddleware.unless = unless;

export default TokenMiddleware;
