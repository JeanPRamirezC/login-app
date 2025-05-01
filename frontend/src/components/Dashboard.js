import React, { useState, useEffect } from "react";
import { getRegistros, getUsuarios } from "../services/api"; // Asegúrate de que ambas funciones están correctamente configuradas
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [usuarios, setUsuarios] = useState([]); // Nuevo estado para usuarios

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    // Obtener los registros de la API
    const fetchRecords = async () => {
      try {
        const data = await getRegistros();
        setRecords(data);
      } catch (error) {
        console.error("Error fetching records", error);
      }
    };

    // Obtener los usuarios de la API
    const fetchUsuarios = async () => {
      try {
        const data = await getUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchRecords();
    fetchUsuarios();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");  // Eliminar el token de localStorage
    navigate("/login"); // Redirigir al login después de cerrar sesión
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center">Registros</h2>

          <h4>Todos los Registros:</h4>
          {records.length === 0 ? (
            <p>No hay registros disponibles.</p>
          ) : (
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Teléfono</th>
                  <th>Estado</th>
                  <th>Fecha de Nacimiento</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.regId}>
                    <td>{record.regNombre}</td>
                    <td>{record.regApellido}</td>
                    <td>{record.regTelefono}</td>
                    <td>{record.regEstado === 1 ? "Activo" : "Inactivo"}</td>
                    <td>{record.regFechaNacimiento}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <h4>Usuarios:</h4>
          {usuarios.length === 0 ? (
            <p>No hay usuarios disponibles.</p>
          ) : (
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Correo</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.usuId}>
                    <td>{usuario.usuId}</td>
                    <td>{usuario.usuUsuario}</td>
                    <td>{usuario.usuCorreo}</td>
                    <td>{usuario.usuEstado === 1 ? "Activo" : "Inactivo"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <button
            className="btn btn-primary w-100 mt-3"
            onClick={() => navigate("/newRegister")}
          >
            Crear Registro
          </button>
          <button
            className="btn btn-primary w-100 mt-3"
            onClick={() => navigate("/newUser")}
          >
            Crear Usuario
          </button>

          {/* Botón Cerrar Sesión al final */}
          <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
