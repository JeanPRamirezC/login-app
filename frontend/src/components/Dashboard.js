import React, { useState, useEffect } from "react";
import { getRegistros } from "../services/api"; // Asegúrate de que esta función está configurada correctamente
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    const fetchRecords = async () => {
      try {
        const data = await getRegistros();  // Obtener los registros de la API
        setRecords(data);  // Establecer los registros en el estado
      } catch (error) {
        console.error("Error fetching records", error);
      }
    };
    fetchRecords();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirigir al login
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center">Registros</h2>
          <button className="btn btn-danger w-100 mb-3" onClick={handleLogout}>
            Cerrar Sesión
          </button>

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

          <button
            className="btn btn-primary w-100 mt-3"
            onClick={() => navigate("/newRegister")}
          >
            Crear Registro
          </button>
          <button
            className="btn btn-primary w-100 mt-3"
            onClick={() => navigate("/change-password")}
          >
            Cambiar Contraseña
          </button>
          <button
            className="btn btn-primary w-100 mt-3"
            onClick={() => navigate("/new-user")}
          >
            Crear Usuario
          </button>
          <button
            className="btn btn-primary w-100 mt-3"
            onClick={() => navigate("/view-users")}
          >
            Ver Usuarios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
