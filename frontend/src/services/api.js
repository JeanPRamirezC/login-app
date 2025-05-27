import axios from 'axios';

// Base URL de tu backend
const api = axios.create({
  baseURL: 'http://localhost:5049/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🟡 Obtener token desde sessionStorage (no localStorage)
const getToken = () => sessionStorage.getItem('token');

// 🔐 Inyectar token en encabezados
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// 🚀 Iniciar sesión
export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/Login/login', loginData);
    if (response.data?.token) {
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('rol', response.data.rol);
      sessionStorage.setItem('usuarioId', response.data.usuarioId);
    }
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

// 👥 Obtener usuarios
export const getUsuarios = async () => {
  try {
    setAuthToken(getToken());
    const response = await api.get('/Usuarios');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo los usuarios:', error);
    throw error;
  }
};

// 📄 Obtener registros
export const getRegistros = async () => {
  try {
    setAuthToken(getToken());
    const response = await api.get('/Usuarios/registros');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo los registros:', error);
    throw error;
  }
};

// ➕ Registrar usuario
export const registerUser = async (userData) => {
  try {
    setAuthToken(getToken());
    const response = await api.post('/Usuarios/crearUsuario', userData);
    return response.data;
  } catch (error) {
    console.error('Error registrando el usuario:', error);
    throw error;
  }
};

// 🛠️ Cambiar contraseña
export const changePassword = async (changeData) => {
  try {
    setAuthToken(getToken());
    const response = await api.put('/Usuarios/cambiarContrasena', changeData); // FIX: ruta corregida
    return response.data;
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    throw error;
  }
};

// ➕ Crear nuevo registro
export const createRegistro = async (registroData) => {
  try {
    setAuthToken(getToken());
    const response = await api.post('/Usuarios/registro', registroData);
    return response.data;
  } catch (error) {
    console.error('Error creando el registro:', error);
    throw error;
  }
};

export const assignRole = async (roleData) => {
  try {
    setAuthToken(getToken()); // Inyecta el token en el header Authorization
    const response = await api.post('/Usuarios/asignarRol', roleData);
    return response.data;
  } catch (error) {
    console.error('Error asignando el rol:', error);
    throw error;
  }
};

export const getRoles = async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    const response = await api.get('/Usuarios/roles');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo roles:', error);
    throw error;
  }
};
export default api;
