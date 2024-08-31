import { v4 as uuidv4 } from 'uuid';
import client from '../config/db.js'; // Assuming the MongoDB client is exported from the db.js file

// Signup handler
export const signup = async (req, res) => {
    const { name, email, phone_number } = req.body;
    const resumePath = req.file ? req.file.path : null;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const userId = uuidv4(); // Generate UUID here

    try {
        const db = client.db("job_seeker_db"); // Replace with your database name
        const result = await db.collection("users").insertOne({
            id: userId,
            name: name,
            email: email,
            phone_number: phone_number,
            resume_path: resumePath,
            created_at: new Date() // Optional: Add a timestamp for when the user signed up
        });

        res.status(201).json({ message: 'User signed up successfully', userId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
