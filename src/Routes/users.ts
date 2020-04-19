import { Router } from 'express';
import {
  getOneUser,
  getUserPackets,
  updateAvatar,
  updateUser,
  updateUserPassword,
} from '../controllers/users';
import fileUploaderMiddleware from '../middleware/file-uploader-middleware';

const router = Router();

router.get('/', getOneUser);
router.get('/packets', getUserPackets);
router.put('/avatar', ...fileUploaderMiddleware, updateAvatar);
router.put('/password', updateUserPassword);
router.put('/', updateUser);

export default router;
