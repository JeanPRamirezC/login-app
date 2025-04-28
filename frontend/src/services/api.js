import axios from 'axios';

// Configurar la base URL de la API
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Asegúrate de cambiar el puerto si es diferente
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para registrar un nuevo usuario
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registrando el usuario:', error);
    throw error;
  }
};

// Función para iniciar sesión
export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/login', loginData);
    return response.data; // Aquí obtendrás el token JWT, por ejemplo
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

// Función para reestablecer la contraseña
export const resetPassword = async (emailData) => {
  try {
    const response = await api.post('/reset-password', emailData);
    return response.data;
  } catch (error) {
    console.error('Error al reestablecer la contraseña:', error);
    throw error;
  }
};

// Exporta más funciones si es necesario
export default api;
