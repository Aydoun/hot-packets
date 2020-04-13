import { Router } from 'express';
import { UploadPicture } from '../controllers/files';
import fileUploaderMiddleware from '../middleware/file-uploader-middleware';

const router = Router();

router.post('/upload', ...fileUploaderMiddleware, UploadPicture);

export default router;
