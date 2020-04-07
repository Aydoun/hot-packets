import { Router } from 'express';
import { getOneUser } from '../controllers/users';

const router = Router();

router.get('/', getOneUser);

export default router;
