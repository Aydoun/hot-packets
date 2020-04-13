import { Request, Response, NextFunction } from 'express';
import systemPath from 'path';
import multer from 'multer';
import uuidv1 from 'uuid/v1';
import FileCompressionMiddleware from './file-compress-middleware';

const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => cb(null, `${uuidv1()}.png`),
});

const fileFilter = (req: Request, file: any, cb: any) => {
  cb(null, file && file.mimetype.indexOf('image/') === 0);
};

const upload = multer({ storage, fileFilter });

const MutlerUploader = (req: Request, res: Response, next: NextFunction) => {
  upload.single('file')(req, res, next);
};

const PostUpload = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return next({
      error: 'No File been provided!',
    });
  }
  console.log('post upload');
  next();
};

export default [MutlerUploader, PostUpload, FileCompressionMiddleware];
