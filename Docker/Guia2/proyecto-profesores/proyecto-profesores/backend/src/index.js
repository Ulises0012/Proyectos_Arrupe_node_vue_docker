// backend/src/index.js
const express = require('express');
const cors = require('cors');
const profesorRoutes = require('./routes/profesorRoutes');
const { initializeDatabase } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/profesores', profesorRoutes);

// Inicializar la base de datos y servidor
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});