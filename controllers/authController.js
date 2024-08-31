import client from '../config/db.js'; // Assuming the MongoDB client is exported from the db.js file
import bcrypt from 'bcryptjs';

const { compare } = bcrypt;
import jwt from 'jsonwebtoken';

const { sign } = jwt;


// Admin Login
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const db = client.db("job_seeker_db");
        const admin = await db.collection("admins").findOne({ username: username });

        if (!admin) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const isMatch = await compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const token = sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
