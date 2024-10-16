// frontend/src/services/profesorService.js
const API_URL = 'http://localhost:3001/profesores';

// Obtener la lista completa de profesores
export async function getProfesores() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error al obtener los profesores: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Obtener un profesor por su ID
export async function getProfesorById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Error al obtener el profesor con ID ${id}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Crear un nuevo profesor
export async function createProfesor(nombre) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre }),
    });
    if (!response.ok) {
      throw new Error(`Error al crear profesor: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Actualizar un profesor por ID
export async function updateProfesor(id, nombre) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre }),
    });
    if (!response.ok) {
      throw new Error(`Error al actualizar el profesor con ID ${id}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Eliminar un profesor por ID
export async function deleteProfesor(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar el profesor con ID ${id}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
