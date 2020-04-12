import { Router } from 'express';
import { Register, Login, verifyToken } from '../controllers/auth';

const router = Router();

router.get('/verify-token', verifyToken);
router.post('/register', Register);
router.post('/login', Login);

export default router;
