import React, { useState, useEffect } from "react";
import { getRegistros, getUsuarios } from "../services/api";
import { useNavigate } from "react-router-dom";

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const rol = parseInt(sessionStorage.getItem("rol"));
    if (!token || rol !== 1) {
      navigate("/unauthorized");
    }

    const fetchData = async () => {
      try {
        const dataRegistros = await getRegistros();
        const dataUsuarios = await getUsuarios();
        setRecords(dataRegistros);
        setUsuarios(dataUsuarios);
      } catch (error) {
        console.error("Error cargando datos", error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Panel Administrador</h2>

      <h4>Registros:</h4>
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
              <th>Fecha Nacimiento</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.regId}>
                <td>{r.regNombre}</td>
                <td>{r.regApellido}</td>
                <td>{r.regTelefono}</td>
                <td>{r.regEstado === 1 ? "Activo" : "Inactivo"}</td>
                <td>{r.regFechaNacimiento}</td>
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
            {usuarios.map((u) => (
              <tr key={u.usuId}>
                <td>{u.usuId}</td>
                <td>{u.usuUsuario}</td>
                <td>{u.usuCorreo}</td>
                <td>{u.usuEstado === 1 ? "Activo" : "Inactivo"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}


      <button className="btn btn-info w-100 mt-3" onClick={() => navigate("/newUser")}>
        Crear Usuario
      </button>
      <button className="btn btn-success w-100 mt-3" onClick={() => navigate("/AsignarRol")}>
        Asignar Rol
      </button>
      <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default DashboardAdmin;
