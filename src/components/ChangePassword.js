import React, { useState } from "react";
import { resetPassword } from "../services/api"; // Asegúrate de que la ruta sea correcta

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      await resetPassword({ email, password });
      window.location.href = "/login"; // Redirigir a login después de cambiar la contraseña
    } catch (err) {
      setError("Error al cambiar la contraseña");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Reestablecer contraseña</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Correo"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Nueva Contraseña"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                placeholder="Confirmar Contraseña"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Confirmar
            </button>
            {error && <p className="text-danger text-center">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
