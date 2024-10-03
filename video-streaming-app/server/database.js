import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: parseInt(process.env.MYSQL_PORT, 10),
});

export { pool };

export async function getUserById(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
        return rows[0] || null;
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        throw err;
    }
}

export async function validateUserCredentials(username, password) {
    try {
        const [accounts] = await pool.query('SELECT * FROM cuenta WHERE username = ?', [username]);
        if (accounts.length === 0) {
            return null;
        }

        const account = accounts[0];
        const isMatch = await bcrypt.compare(password, account.password_hash);

        if (isMatch) {
            const [users] = await pool.query('SELECT * FROM usuario WHERE id = ?', [account.usuario_id]);
            return users[0] || null;
        } else {
            return null;
        }
    } catch (err) {
        console.error('Error al validar credenciales:', err);
        throw err;
    }
}

export async function getAllVideos() {
    try {
        const [rows] = await pool.query(`
            SELECT videos.*, GROUP_CONCAT(categorias.nombre SEPARATOR ', ') AS nombre_categoria
            FROM videos
            LEFT JOIN video_categoria ON videos.id = video_categoria.video_id
            LEFT JOIN categorias ON video_categoria.categoria_id = categorias.id
            GROUP BY videos.id
        `);
        return rows;
    } catch (err) {
        console.error('Error al obtener videos:', err);
        throw err;
    }
}

export async function getVideosByCategory(categoryId) {
    try {
        const [rows] = await pool.query(`
            SELECT videos.*, categorias.nombre AS nombre_categoria
            FROM videos
            LEFT JOIN video_categoria ON videos.id = video_categoria.video_id
            LEFT JOIN categorias ON video_categoria.categoria_id = categorias.id
            WHERE categorias.id = ?
        `, [categoryId]);
        return rows;
    } catch (err) {
        console.error('Error al obtener videos por categoría:', err);
        throw err;
    }
}

export async function getAllCategories() {
    try {
        const [rows] = await pool.query('SELECT nombre FROM categorias');
        return rows.map(row => row.nombre); // Devuelve solo los nombres de las categorías
    } catch (err) {
        console.error('Error al obtener categorías:', err);
        throw err;
    }
}

export async function registerUser(primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, username, password) {
    const connection = await pool.getConnection();
    try {
        const password_hash = await bcrypt.hash(password, 10);
        await connection.beginTransaction();

        const [resultUsuario] = await connection.query(
            'INSERT INTO usuario (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email) VALUES (?, ?, ?, ?, ?)',
            [primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email]
        );
        const usuario_id = resultUsuario.insertId;

        await connection.query(
            'INSERT INTO cuenta (usuario_id, username, password_hash) VALUES (?, ?, ?)',
            [usuario_id, username, password_hash]
        );

        await connection.commit();
        return { success: true };
    } catch (err) {
        await connection.rollback();
        console.error('Error al registrar usuario:', err);
        throw err;
    } finally {
        connection.release();
    }
}
