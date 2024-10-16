// frontend/src/components/ProfesorCrud.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProfesores, deleteProfesor } from '../services/profesorService';
import './ProfesorCrud.css'; 

const ProfesorCrud = () => {
  const [profesores, setProfesores] = useState([]);

  useEffect(() => {
    async function fetchProfesores() {
      const data = await getProfesores();
      setProfesores(data);
    }
    fetchProfesores();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProfesor(id);
      setProfesores(profesores.filter(profesor => profesor.id !== id));
    } catch (error) {
      console.error('Error al eliminar el profesor:', error);
    }
  };

  return (
    <div className="profesor-crud-container">
      <h1>Gestión de Profesores</h1>
      <div className="profesor-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {profesores.length > 0 ? (
              profesores.map(profesor => (
                <tr key={profesor.id}>
                  <td>{profesor.id}</td>
                  <td>{profesor.nombre}</td>
                  <td>
                    <Link to={`/profesores/editar/${profesor.id}`}>
                      <button className="edit-btn">Editar</button>
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(profesor.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No hay profesores disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="crear-profesor">
        <Link to="/crear-profesor">
          <button className="add-btn">Agregar Nuevo Profesor</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfesorCrud;
