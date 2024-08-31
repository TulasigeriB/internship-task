import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import path from 'path';
import cors from 'cors';
import { connectToMongoDB } from './config/db.js'; 

config();

const app = express();

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json({ limit: '50mb' }));

// Routes
import userRoutes from './api/user.js';
import adminRoutes from './api/admin.js';
import authRoutes from './api/auth.js';

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/admin', adminRoutes);
app.use('/api/auth', authRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
// Call connectToMongoDB() before handling requests
connectToMongoDB().then(() => {
    // Start listening for requests only after the DB connection is established
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process if unable to connect to MongoDB
});
