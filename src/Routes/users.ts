import { Router } from 'express';
import { getOneUser, getUserPackets, updateAvatar } from '../controllers/users';
import fileUploaderMiddleware from '../middleware/file-uploader-middleware';

const router = Router();

router.get('/', getOneUser);
router.get('/packets', getUserPackets);
router.put('/avatar', ...fileUploaderMiddleware, updateAvatar);

export default router;
