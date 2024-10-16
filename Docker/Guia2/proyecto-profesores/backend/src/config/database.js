// backend/src/config/database.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'profesores_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function initializeDatabase() {
  let retries = 20; // Número de reintentos
  while (retries) {
    try {
      const connection = await pool.getConnection();
      try {
        await connection.execute(`
          CREATE TABLE IF NOT EXISTS profesores (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL
          )
        `);
        console.log('Base de datos inicializada correctamente');
      } finally {
        connection.release(); 
      }
      break; 
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
      retries -= 1; 
      console.log(`Reintentando en 5 segundos... (${20 - retries} intentos restantes)`);
      await new Promise(res => setTimeout(res, 5000)); 
    }
  }

  if (retries === 0) {
    console.error('No se pudo conectar a la base de datos después de varios intentos.');
    throw new Error('No se pudo conectar a la base de datos');
  }
}

module.exports = {
  execute: (...params) => pool.execute(...params),
  initializeDatabase
};
