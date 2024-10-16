// frontend/src/components/CrearProfesor.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './CrearProfesor.css'; // Asegúrate de tener este archivo CSS para los estilos

const CrearProfesor = () => {
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Inicializar el hook useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3001/profesores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
      });

      if (!response.ok) {
        throw new Error('Error al crear el profesor');
      }

      const data = await response.json();
      setSuccess(`Profesor creado con ID: ${data.id}`);
      setNombre(''); // Limpiar el campo
      
      // Redirigir a la página principal después de crear el profesor
      setTimeout(() => {
        navigate('/'); // Cambiar a la ruta "/"
      }, 1000); // Esperar 1 segundo antes de redirigir (puedes ajustar este tiempo)

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="create-profesor-container">
      <h2>Crear Nuevo Profesor</h2>
      <form onSubmit={handleSubmit} className="create-profesor-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            placeholder="Ingrese el nombre del profesor"
          />
        </div>
        <button type="submit">Crear Profesor</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default CrearProfesor;
