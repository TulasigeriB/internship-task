import db from '../config/db.js';
import path from 'path';
const __dirname = path.resolve();

// Get all applications
export const getApplications = (req, res) => {
    const sql = `SELECT id, name, created_at, status FROM users`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json(results);
    });
};

// Get all applications
export const getApplicationsDetails = (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM users WHERE id="${id}"`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json(results);
    });
};

// Accept an application
export const acceptApplication = (req, res) => {
    const { id } = req.params;

    const sql = `UPDATE users SET status = 'Accepted' WHERE id = "${id}"`;
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json({ message: 'Application accepted' });
    });
};

// Reject an application
export const rejectApplication = (req, res) => {
    const { id } = req.params;

    const sql = `UPDATE users SET status = 'Rejected' WHERE id = ?`;
    db(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json({ message: 'Application rejected' });
    });
};