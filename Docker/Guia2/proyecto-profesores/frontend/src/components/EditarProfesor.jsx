// frontend/src/components/EditarProfesor.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfesorById, updateProfesor } from '../services/profesorService'; // Cambiado a getProfesorById
import './EditarProfesor.css';

const EditarProfesor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfesor() {
      try {
        const profesor = await getProfesorById(id); // Usando la función correcta
        setNombre(profesor.nombre);
      } catch (err) {
        setError('Error al cargar el profesor');
      }
    }
    fetchProfesor();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfesor(id, nombre);
      navigate('/');
    } catch (err) {
      setError('Error al actualizar el profesor');
    }
  };

  // Nueva función para regresar
  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="editar-profesor-container">
      <h1>Editar Profesor</h1>
      {error && <div className="error-message">{error}</div>}
      
      {/* Botón de regresar */}
      <button onClick={handleBack} className="back-btn">
        ← Regresar
      </button>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre del Profesor</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">
          <i className="fas fa-save"></i> Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarProfesor;
