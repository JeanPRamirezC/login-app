import axios from 'axios';

// Configurar la base URL de la API
const api = axios.create({
  baseURL: 'http://localhost:5049/api', // Puerto y ruta correcta
  headers: {
    'Content-Type': 'application/json',  // Indica que el cuerpo de la solicitud es JSON
  },
});


// Obtener el token almacenado en localStorage
const getToken = () => localStorage.getItem('token');

// Configurar el token en los encabezados de las solicitudes
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Función para obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    setAuthToken(getToken());  // Añadir el token a la solicitud
    const response = await api.get('/usuarios');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo los usuarios:', error);
    throw error;
  }
};

// Función para obtener todos los registros
export const getRegistros = async () => {
  try {
    setAuthToken(getToken());  // Añadir el token a la solicitud
    const response = await api.get('/Usuarios/registros');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo los registros:', error);
    throw error;
  }
};

// Función para registrar un nuevo usuario
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/crearUsuario', userData); // Endpoint ajustado a tu controlador
    return response.data;
  } catch (error) {
    console.error('Error registrando el usuario:', error);
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/Login/login', loginData); // Ruta correcta
    if (response.data && response.data.token) {
      // Guarda el token si la respuesta es exitosa
      localStorage.setItem('token', response.data.token);
    }
    return response.data; // Retorna la respuesta
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};



// Función para cambiar la contraseña
export const changePassword = async (changeData) => {
  try {
    setAuthToken(getToken());  // Añadir el token a la solicitud
    const response = await api.put('/cambiarContrasena', changeData); // Endpoint para cambiar contraseña
    return response.data;
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    throw error;
  }
};

// Función para crear un nuevo registro
export const createRegistro = async (registroData) => {
  try {
    setAuthToken(getToken());  // Añadir el token a la solicitud
    const response = await api.post('/Usuarios/registro', registroData); // Endpoint para crear registro
    return response.data;
  } catch (error) {
    console.error('Error creando el registro:', error);
    throw error;
  }
};

export default api;
