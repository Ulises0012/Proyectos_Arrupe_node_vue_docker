// frontend/src/components/ProfesoresList.jsx
import React, { useState, useEffect } from 'react';
import { getProfesores } from '../services/profesorService';

function ProfesoresList() {
  const [profesores, setProfesores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const data = await getProfesores();
        setProfesores(data);
      } catch (err) {
        setError('Error al cargar los profesores');
        console.error(err);
      }
    };

    fetchProfesores();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul>
      {profesores.map((profesor, index) => (
        <li key={index}>{profesor.nombre}</li>
      ))}
    </ul>
  );
}

export default ProfesoresList;