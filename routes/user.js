import { Router } from 'express';
import { signup } from '../controllers/userController.js';
import { upload } from '../middleware/uploadMiddleware.js';
const router = Router();

router.post('/signup', upload, signup);

export default router;
