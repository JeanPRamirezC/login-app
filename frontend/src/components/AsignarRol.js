import React, { useState, useEffect } from "react";
import { getUsuarios, assignRole, getRoles } from "../services/api";
import { useNavigate } from "react-router-dom";

const AsignarRol = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]); // Lista dinámica de roles
  const [usuarioId, setUsuarioId] = useState("");
  const [rolId, setRolId] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const rol = sessionStorage.getItem("rol");

    if (!token || rol !== "Administrador") {
      navigate("/unauthorized");
    }

    const cargarDatos = async () => {
      try {
        const [usuariosData, rolesData] = await Promise.all([
          getUsuarios(),
          getRoles(),
        ]);
        setUsuarios(usuariosData);
        setRoles(rolesData);
      } catch (err) {
        console.error(err);
        setError("Error al cargar usuarios o roles.");
      }
    };

    cargarDatos();
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

      // Recargar usuarios
      const updated = await getUsuarios();
      setUsuarios(updated);
    } catch (err) {
      console.error(err);
      setError("Error al asignar el rol.");
      setMensaje("");
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
              {u.usuUsuario} - {u.usuCorreo} ({u.rol?.rolNombre || "Sin Rol"})
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
          {roles.map((r) => (
            <option key={r.rolId} value={r.rolId}>
              {r.rolNombre}
            </option>
          ))}
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
              <td>{u.rol?.rolNombre || "Sin Rol"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AsignarRol;

