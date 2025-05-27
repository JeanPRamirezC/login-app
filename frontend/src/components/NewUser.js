import React, { useState, useEffect } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [userDetails, setUserDetails] = useState({
    usuId: 0,
    usuUsuario: "",
    usuCorreo: "",
    usuContrasenia: "",
    usuEstado: 1,
    rolId: null,           // Se mantiene null según tu ejemplo
    usuRegistroId: null,   // Se mantiene null según tu ejemplo
    rol: null,             // omitido en el envío, o puedes incluir como null
    registro: {
      regId: 0,
      regNombre: "",
      regApellido: "",
      regTelefono: "",
      regEstado: 1,
      regFechaNacimiento: ""
    }
  });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("reg")) {
      setUserDetails((prev) => ({
        ...prev,
        registro: {
          ...prev.registro,
          [name]: value
        }
      }));
    } else {
      setUserDetails((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(userDetails);
      navigate("/admin"); // o /empleado según redirección por rol
    } catch (err) {
      console.error(err);
      setError("Error al registrar el usuario.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Crear Usuario</h2>
          <form onSubmit={handleSubmit}>
            {/* Datos del usuario */}
            <input
              type="text"
              name="usuUsuario"
              value={userDetails.usuUsuario}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Nombre de Usuario"
              required
            />
            <input
              type="email"
              name="usuCorreo"
              value={userDetails.usuCorreo}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Correo"
              required
            />
            <input
              type="password"
              name="usuContrasenia"
              value={userDetails.usuContrasenia}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Contraseña"
              required
            />

            {/* Datos del registro */}
            <input
              type="text"
              name="regNombre"
              value={userDetails.registro.regNombre}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Nombre"
              required
            />
            <input
              type="text"
              name="regApellido"
              value={userDetails.registro.regApellido}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Apellido"
              required
            />
            <input
              type="text"
              name="regTelefono"
              value={userDetails.registro.regTelefono}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Teléfono"
              required
            />
            <input
              type="date"
              name="regFechaNacimiento"
              value={userDetails.registro.regFechaNacimiento}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Fecha de Nacimiento"
              required
            />

            <button type="submit" className="btn btn-primary w-100">
              Crear Usuario
            </button>

            {error && <p className="text-danger text-center mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUser;

