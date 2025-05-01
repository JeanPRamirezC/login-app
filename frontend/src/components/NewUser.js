import React, { useState, useEffect } from "react";
import { registerUser } from "../services/api"; // Asegúrate de que esta función esté correctamente configurada
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const navigate = useNavigate(); // Para redirigir al login si no hay token
  const [userDetails, setUserDetails] = useState({
    usuId: "",        // Agregado el campo usuId para que el usuario lo ingrese manualmente
    usuUsuario: "",   // Usuario
    usuCorreo: "",    // Correo
    usuContrasenia: "", // Contraseña
    usuEstado: 1,     // Estado (por defecto, activo)
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");  // Redirigir a login si no hay token
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí estamos enviando todos los datos, incluido el usuId
      await registerUser(userDetails);
      window.location.href = "/dashboard"; // Redirigir al dashboard después de registrar
    } catch (err) {
      setError("Error al registrar el usuario");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Crear Nuevo Usuario</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="number"
                name="usuId"  // Campo para ingresar el ID del usuario
                value={userDetails.usuId}
                onChange={handleChange}
                className="form-control"
                placeholder="ID de Usuario"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="usuUsuario"  // Campo para el nombre de usuario
                value={userDetails.usuUsuario}
                onChange={handleChange}
                className="form-control"
                placeholder="Usuario"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="usuCorreo"  // Campo para el correo del usuario
                value={userDetails.usuCorreo}
                onChange={handleChange}
                className="form-control"
                placeholder="Correo"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="usuContrasenia"  // Campo para la contraseña
                value={userDetails.usuContrasenia}
                onChange={handleChange}
                className="form-control"
                placeholder="Contraseña"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Confirmar
            </button>
            {error && <p className="text-danger text-center">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
