import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import path from 'path';
import cors from 'cors';


config();

const app = express();

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json({ limit: '50mb' }));
app.use(cors());

// Routes
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';
import authRoutes from './routes/auth.js';

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/admin', adminRoutes);
app.use('/api/auth', authRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
