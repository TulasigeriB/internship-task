import { v4 as uuidv4 } from 'uuid'; // Ensure you're importing uuidv4
import db from '../config/db.js'; // Adjust the import based on your project structure

// Signup handler
export const signup = (req, res) => {
    const { name, email, phone_number } = req.body;
    const resumePath = req.file ? req.file.path : null;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const userId = uuidv4(); // Generate UUID here

    const sql = `INSERT INTO users (id, name, email, phone_number, resume_path) VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, [userId, name, email, phone_number, resumePath], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User signed up successfully', userId });
    });
};
