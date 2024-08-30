import { Router } from 'express';
import { getApplications,getApplicationsDetails, acceptApplication, rejectApplication } from '../controllers/adminController.js';
import authMiddleware from '../middleware/auth.js';
import path from 'path';
const __dirname = path.resolve();

const router = Router();

router.use(authMiddleware);

router.get('/applications', getApplications);
router.get('/applications/:id/get', getApplicationsDetails);

router.post('/applications/:id/accept', acceptApplication);
router.post('/applications/:id/reject', rejectApplication);

// Serve the admin login page
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/admin-login.html'));
});

export default router;
