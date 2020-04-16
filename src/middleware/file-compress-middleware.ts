import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';

const FileCompressionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { path: filePath } = req.file;
  const absolutePath = path.join(process.cwd(), filePath);
  const data = await sharp(absolutePath).resize(200).png().toBuffer();
  fs.writeFileSync(absolutePath, data);

  next();
};

export default FileCompressionMiddleware;
