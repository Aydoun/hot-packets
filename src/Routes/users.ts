import { Router } from 'express';
import {
  getOneUser,
  getUserPackets,
  updateAvatar,
  updateUser,
} from '../controllers/users';
import fileUploaderMiddleware from '../middleware/file-uploader-middleware';

const router = Router();

router.get('/', getOneUser);
router.get('/packets', getUserPackets);
router.put('/avatar', ...fileUploaderMiddleware, updateAvatar);
router.put('/', updateUser);

export default router;
