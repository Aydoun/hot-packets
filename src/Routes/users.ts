import { Router } from 'express';
import { getOneUser, getUserPackets } from '../controllers/users';

const router = Router();

router.get('/', getOneUser);
router.get('/packets', getUserPackets);

export default router;
