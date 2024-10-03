// backend/src/models/profesorModel.js
const db = require('../config/database');

class ProfesorModel {
  static async getProfesores() {
    const [rows] = await db.execute('SELECT nombre FROM profesores');
    return rows;
  }

  // Cambia el nombre del método de setProfesores a addProfesor
  static async addProfesor(nombre){
    const query = 'INSERT INTO profesores (nombre) VALUES (?)';
    await db.execute(query, [nombre]);
    return "Agregado correctamente";
  }
}

module.exports = ProfesorModel;
