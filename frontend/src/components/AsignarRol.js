import React, { useState, useEffect } from "react";
import { getUsuarios, assignRole } from "../services/api";
import { useNavigate } from "react-router-dom";

const AsignarRol = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioId, setUsuarioId] = useState("");
  const [rolId, setRolId] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const rol = parseInt(sessionStorage.getItem("rol"));

    if (!token || rol !== 1) {
      navigate("/unauthorized");
    }

    const cargarUsuarios = async () => {
      try {
        const data = await getUsuarios();
        setUsuarios(data);
      } catch (err) {
        console.error(err);
        setError("Error al obtener los usuarios.");
      }
    };

    cargarUsuarios();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioId || !rolId) {
      setError("Debes seleccionar usuario y rol.");
      return;
    }

    try {
      await assignRole({
        usuarioId: parseInt(usuarioId),
        rolId: parseInt(rolId),
      });
      setMensaje("Rol asignado correctamente.");
      setError("");
      setUsuarioId("");
      setRolId("");

      // recargar usuarios actualizados
      const updated = await getUsuarios();
      setUsuarios(updated);
    } catch (err) {
      console.error(err);
      setError("Error al asignar el rol.");
      setMensaje("");
    }
  };

  const obtenerNombreRol = (rolId) => {
    switch (rolId) {
      case 1: return "Administrador";
      case 2: return "Empleado";
      default: return "Sin Rol";
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Asignar Rol a Usuario</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <select
          className="form-select mb-3"
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
          required
        >
          <option value="">Selecciona un usuario</option>
          {usuarios.map((u) => (
            <option key={u.usuId} value={u.usuId}>
              {u.usuUsuario} - {u.usuCorreo} ({obtenerNombreRol(u.rolId)})
            </option>
          ))}
        </select>

        <select
          className="form-select mb-3"
          value={rolId}
          onChange={(e) => setRolId(e.target.value)}
          required
        >
          <option value="">Selecciona un rol</option>
          <option value={1}>Administrador</option>
          <option value={2}>Empleado</option>
        </select>

        <button type="submit" className="btn btn-primary w-100">
          Asignar Rol
        </button>

        {mensaje && <p className="text-success text-center mt-2">{mensaje}</p>}
        {error && <p className="text-danger text-center mt-2">{error}</p>}
      </form>

      <h4>Usuarios actuales</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Correo</th>
            <th>Rol Actual</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.usuId}>
              <td>{u.usuId}</td>
              <td>{u.usuUsuario}</td>
              <td>{u.usuCorreo}</td>
              <td>{obtenerNombreRol(u.rolId)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AsignarRol;
