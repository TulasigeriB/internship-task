import { createConnection } from 'mysql';
import { config } from 'dotenv';

config();

const db = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: '',
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

export default db;
