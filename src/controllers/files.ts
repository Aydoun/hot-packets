import { RequestHandler, Request } from 'express';
import handleErrorMiddleware from '../middleware/handle-error-middleware';

export const fileFilter = (
  req: Request,
  file: any,
  cb: (a: object, condition: boolean) => {},
) => {
  cb(null, file && file.mimetype.indexOf('image/') === 0);
};

export const UploadPicture: RequestHandler = handleErrorMiddleware(
  async (req, res) => {
    if (!req.file) {
    }
    // console.log('req.file', req.file);
    res.send({ result: !req.file });
  },
);
