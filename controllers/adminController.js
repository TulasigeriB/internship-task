import client from '../config/db.js'; // Assuming the MongoDB client is exported from the db.js file
import { ObjectId } from 'mongodb';
import path from 'path';
const __dirname = path.resolve();

const dbName = "job_seeker_db";
const collectionName = "users";

// Get all applications
export const getApplications = async (req, res) => {
    try {
        const db = client.db(dbName);
        const users = await db.collection(collectionName).find({}).toArray();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getApplicationDetails = async (req, res) => {
    const { id } = req.params;
    try {
        // Validate if it's a UUID format if needed
        if (!id) return res.status(400).json({ error: "ID is required" });

        const db = client.db(dbName);
        // Use string ID for UUIDs
        const user = await db.collection(collectionName).findOne({ id: id });

        if (!user) return res.status(404).json({ error: "Application not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};