import jwt from 'jsonwebtoken';
import unless from 'express-unless';
import { Request, Response, NextFunction } from 'express';

interface IToken {
  id: string;
  iat: number;
  exp: number;
}

const TokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = (req.headers['x-api-key'] as string) || req.query.token;

  if (token) {
    try {
      const decoded = (await jwt.verify(
        token,
        process.env.TOKEN_SECRET,
      )) as IToken;

      // if (decoded.exp) {
      //   if (Math.floor(new Date().getTime() / 1000) - decoded.exp > 0) {
      //     next(new Error('Invalid Token'));
      //   }
      // }
      res.locals.decoded = decoded;
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
