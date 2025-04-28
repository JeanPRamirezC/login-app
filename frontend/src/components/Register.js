import React, { useState } from "react";
import { registerUser } from "../services/api"; // Asegúrate de que la ruta sea correcta

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    correo: "",
    telefono: "",
    fechaNacimiento: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      await registerUser(userDetails);
      window.location.href = "/login"; // Redirigimos al login después de registrar
    } catch (err) {
      setError("Error al registrar el usuario");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Registrarse</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="nombre"
                value={userDetails.nombre}
                onChange={handleChange}
                className="form-control"
                placeholder="Nombre"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="apellido"
                value={userDetails.apellido}
                onChange={handleChange}
                className="form-control"
                placeholder="Apellido"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="correo"
                value={userDetails.correo}
                onChange={handleChange}
                className="form-control"
                placeholder="Correo"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Contraseña"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="confirmPassword"
                value={userDetails.confirmPassword}
                onChange={handleChange}
                className="form-control"
                placeholder="Confirmar Contraseña"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Confirmar
            </button>
            <button
              type="button"
              onClick={() => window.location.href = "/login"}
              className="btn btn-link w-100 mb-3"
            >
              ¿Ya tienes cuenta? Inicia sesión aquí
            </button>
            {error && <p className="text-danger text-center">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
