import db from '../config/db.js';
import pkg1 from 'bcryptjs';
const { compare } = pkg1;
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { config } from 'dotenv';

config();

// Admin Login
export const login = (req, res) => {
    const { username, password } = req.body;

    const sql = `SELECT * FROM admins WHERE username = ?`;
    console.log(db);
    
    db.query(sql, [username], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const admin = results[0];
        const isMatch = await compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const token = sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    });
};
