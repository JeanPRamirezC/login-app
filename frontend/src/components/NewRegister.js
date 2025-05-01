import React, { useState } from "react";
import { createRegistro } from "../services/api"; // Asegúrate de que la ruta sea correcta

const NewRegister = () => {
  const [registerDetails, setRegisterDetails] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    fechaNacimiento: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterDetails({ ...registerDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí puedes agregar lógica para crear un nuevo registro en la base de datos
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
                type="text"
                name="nombre"
                value={registerDetails.nombre}
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
                value={registerDetails.apellido}
                onChange={handleChange}
                className="form-control"
                placeholder="Apellido"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="telefono"
                value={registerDetails.telefono}
                onChange={handleChange}
                className="form-control"
                placeholder="Teléfono"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="fechaNacimiento"
                value={registerDetails.fechaNacimiento}
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
