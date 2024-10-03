import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { validateUserCredentials, getAllVideos, getVideosByCategory, getAllCategories, pool } from './database.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
    }

    try {
        const user = await validateUserCredentials(username, password);
        if (user) {
            res.status(200).json({ success: true, user });
        } else {
            res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Register endpoint
app.post('/register', async (req, res) => {
    const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, username, password } = req.body;

    if (!primer_nombre || !primer_apellido || !email || !username || !password) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO usuario (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email) VALUES (?, ?, ?, ?, ?)',
            [primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email]
        );
        const usuario_id = result.insertId;

        await pool.query(
            'INSERT INTO cuenta (usuario_id, username, password_hash) VALUES (?, ?, ?)',
            [usuario_id, username, hashedPassword]
        );

        res.json({ success: true, message: 'Registration successful' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get all videos endpoint
app.get('/videos', async (req, res) => {
    try {
        const videos = await getAllVideos();
        res.status(200).json(videos);
    } catch (error) {
        console.error('Error getting videos:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get videos by category endpoint
app.get('/videos/category/:categoryId', async (req, res) => {
    const categoryId = parseInt(req.params.categoryId, 10);

    if (isNaN(categoryId)) {
        return res.status(400).json({ error: 'Invalid category ID' });
    }

    try {
        const videos = await getVideosByCategory(categoryId);
        res.status(200).json(videos);
    } catch (error) {
        console.error('Error getting videos by category:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all categories endpoint
app.get('/categories', async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
