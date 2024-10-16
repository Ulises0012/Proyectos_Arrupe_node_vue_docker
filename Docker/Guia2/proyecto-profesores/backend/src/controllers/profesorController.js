// backend/src/controllers/profesorController.js
const ProfesorModel = require('../models/profesorModel');

exports.getProfesores = async (req, res) => {
  try {
    const profesores = await ProfesorModel.getProfesores();
    res.json(profesores);
  } catch (error) {
    console.error('Error al obtener los profesores:', error);
    res.status(500).json({ error: 'Error al obtener los profesores' });
  }
};

exports.getProfesorById = async (req, res) => {
  const { id } = req.params;
  try {
    const profesor = await ProfesorModel.getProfesorById(id);
    if (profesor) {
      res.json(profesor);
    } else {
      res.status(404).json({ error: 'Profesor no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el profesor:', error);
    res.status(500).json({ error: 'Error al obtener el profesor' });
  }
};

exports.createProfesor = async (req, res) => {
  const { nombre } = req.body;
  try {
    const id = await ProfesorModel.createProfesor(nombre);
    res.status(201).json({ id, nombre }); // Cambié a 201 para indicar que se creó un nuevo recurso
  } catch (error) {
    console.error('Error al crear el profesor:', error);
    res.status(500).json({ error: 'Error al crear el profesor' });
  }
};

exports.updateProfesor = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const rowsUpdated = await ProfesorModel.updateProfesor(id, nombre);
    if (rowsUpdated > 0) {
      res.json({ message: 'Profesor actualizado correctamente' });
    } else {
      res.status(404).json({ error: 'Profesor no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el profesor:', error);
    res.status(500).json({ error: 'Error al actualizar el profesor' });
  }
};

exports.deleteProfesor = async (req, res) => {
  const { id } = req.params;
  try {
    const rowsDeleted = await ProfesorModel.deleteProfesor(id);
    if (rowsDeleted > 0) {
      res.json({ message: 'Profesor eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Profesor no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el profesor:', error);
    res.status(500).json({ error: 'Error al eliminar el profesor' });
  }
};
