import React, { useState, useEffect } from "react";
import { createRegistro } from "../services/api"; // Asegúrate de que esta función esté correctamente configurada
import { useNavigate } from "react-router-dom";

const NewRegister = () => {
  const navigate = useNavigate(); // Para redirigir al login si no hay token
  const [registerDetails, setRegisterDetails] = useState({
    regId: "",  // El ID del registro
    regNombre: "",
    regApellido: "",
    regTelefono: "",
    regFechaNacimiento: "",
    regEstado: 1,  // Suponiendo que el estado es "1" por defecto
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");  // Redirigir al login si no hay token
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterDetails({ ...registerDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí estamos enviando el regId junto con los demás detalles
      await createRegistro(registerDetails);
      window.location.href = "/dashboard"; // Redirigir al dashboard después de registrar
    } catch (err) {
      setError("Error al crear el registro");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Crear Nuevo Registro</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="number"
                name="regId"
                value={registerDetails.regId}
                onChange={handleChange}
                className="form-control"
                placeholder="ID (RegId)"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="regNombre"
                value={registerDetails.regNombre}
                onChange={handleChange}
                className="form-control"
                placeholder="Nombre"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="regApellido"
                value={registerDetails.regApellido}
                onChange={handleChange}
                className="form-control"
                placeholder="Apellido"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="regTelefono"
                value={registerDetails.regTelefono}
                onChange={handleChange}
                className="form-control"
                placeholder="Teléfono"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="regFechaNacimiento"
                value={registerDetails.regFechaNacimiento}
                onChange={handleChange}
                className="form-control"
                placeholder="Fecha de Nacimiento (YYYY-MM-DD)"
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

export default NewRegister;
