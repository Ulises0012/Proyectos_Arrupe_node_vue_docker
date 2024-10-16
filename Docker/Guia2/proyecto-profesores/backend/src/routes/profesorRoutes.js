    // backend/src/routes/profesorRoutes.js
    const express = require('express');
    const profesorController = require('../controllers/profesorController');

    const router = express.Router();

    // Ruta para obtener todos los profesores
    router.get('/profesores', profesorController.getProfesores);

    // Ruta para obtener un profesor por su ID
    router.get('/profesores/:id', profesorController.getProfesorById);

    // Ruta para crear un nuevo profesor
    router.post('/profesores', profesorController.createProfesor);

    // Ruta para actualizar un profesor existente
    router.put('/profesores/:id', profesorController.updateProfesor);

    // Ruta para eliminar un profesor
    router.delete('/profesores/:id', profesorController.deleteProfesor);

    module.exports = router;
