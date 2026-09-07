import { Router } from 'express';

const router = Router();

import { registerUser, loginUser, getMe, googleLogin } from '../controllers/authController.js';

import { protect } from '../middleware/auth.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);
router.get('/me', protect, getMe);

export default router;
