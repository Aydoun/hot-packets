import { Request, Response, NextFunction } from 'express';

const FileCompressionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // TODO: We defined later what that would be
  console.log('compressing');
  next();
};

export default FileCompressionMiddleware;
