import React, { useState } from "react";
import { registerUser } from "../services/api"; // Asegúrate de que la ruta sea correcta

const NewUser = () => {
  const [userDetails, setUserDetails] = useState({
    usuario: "",
    correo: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí puedes agregar lógica para crear un nuevo usuario en la base de datos
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
                type="text"
                name="usuario"
                value={userDetails.usuario}
                onChange={handleChange}
                className="form-control"
                placeholder="Usuario"
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
