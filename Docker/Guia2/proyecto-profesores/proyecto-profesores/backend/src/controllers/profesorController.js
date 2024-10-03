  // backend/src/controllers/profesorController.js
  const ProfesorModel = require('../models/profesorModel');

  class ProfesorController {
    async getProfesores(req, res) {
      try {
        const profesores = await ProfesorModel.getProfesores();
        res.json(profesores);
      } catch (error) {
        res.status(500).json({ message: 'Error al obtener profesores', error: error.message });
      }
    }

    async addProfesor(req, res) {
      try {
        const { nombre } = req.body;
        if (!nombre) {
          return res.status(400).json({ message: 'El campo nombre es obligatorio' });
        }

        await ProfesorModel.addProfesor(nombre); 
        res.status(201).json({ message: 'Profesor agregado correctamente' });
      } catch (error) {
        res.status(500).json({ message: 'Error al agregar profesor', error: error.message });
      }
    }
  }

  module.exports = new ProfesorController();
