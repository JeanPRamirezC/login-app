import React, { useState, useEffect } from "react";
import { getRegistros } from "../services/api";
import { useNavigate } from "react-router-dom";

const DashboardEmpleado = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const rol = parseInt(sessionStorage.getItem("rol"));
    if (!token || rol !== 2) {
      navigate("/unauthorized");
    }

    const fetchData = async () => {
      try {
        const data = await getRegistros();
        setRecords(data);
      } catch (error) {
        console.error("Error obteniendo tu registro", error);
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
      <h2 className="text-center">Panel Empleado</h2>

      <h4>Tu Registro:</h4>
      {records.length === 0 ? (
        <p>No se encontró tu registro.</p>
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

      <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default DashboardEmpleado;
