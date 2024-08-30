import pkg from 'jsonwebtoken';
const { verify } = pkg;
import { config } from 'dotenv';

config();

const authMiddleware = (req, res, next) => {
    // Skip authentication for the admin login route
    if (req.path.startsWith('/login')) {
        return next();
    }
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default authMiddleware;
