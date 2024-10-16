// backend/src/models/profesorModel.js
const db = require('../config/database');

class ProfesorModel {
  static async getProfesores() {
    const [rows] = await db.execute('SELECT * FROM profesores');
    return rows;
  }

  static async getProfesorById(id) {
    const [rows] = await db.execute('SELECT * FROM profesores WHERE id = ?', [id]);
    return rows[0];  // Devolver solo el primer resultado
  }

  static async createProfesor(nombre) {
    const [result] = await db.execute('INSERT INTO profesores (nombre) VALUES (?)', [nombre]);
    return result.insertId; // Devolver el ID del nuevo profesor
  }

  static async updateProfesor(id, nombre) {
    const [result] = await db.execute('UPDATE profesores SET nombre = ? WHERE id = ?', [nombre, id]);
    return result.affectedRows; // Verificar si se actualizó alguna fila
  }

  static async deleteProfesor(id) {
    const [result] = await db.execute('DELETE FROM profesores WHERE id = ?', [id]);
    return result.affectedRows; // Verificar si se eliminó alguna fila
  }
}

module.exports = ProfesorModel;
