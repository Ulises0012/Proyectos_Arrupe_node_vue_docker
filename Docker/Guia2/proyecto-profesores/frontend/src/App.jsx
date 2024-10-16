// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfesorCrud from './components/ProfesorCrud';
import EditarProfesor from './components/EditarProfesor'; // Asegúrate de tener este componente
import CrearProfesor from './components/CrearProfesor';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para la gestión de profesores */}
        <Route path="/" element={<ProfesorCrud />} />

        {/* Ruta para crear un nuevo profesor */}
        <Route path="/crear-profesor" element={<CrearProfesor />} />

        {/* Ruta para editar un profesor específico */}
        <Route path="/profesores/editar/:id" element={<EditarProfesor />} />
      </Routes>
    </Router>
  );
}

export default App;
