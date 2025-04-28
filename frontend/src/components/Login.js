import React, { useState } from "react";
import { loginUser } from "../services/api"; // Asegúrate de que la ruta sea correcta

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem("token", response.token); // Guardar el token
      window.location.href = "/dashboard"; // Redirigir al Dashboard
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Iniciar Sesión</h2>
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
                placeholder="Contraseña"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Ingresar
            </button>
            <button
              type="button"
              onClick={() => window.location.href = "/register"}
              className="btn btn-link w-100 mb-3"
            >
              ¿No tienes una cuenta? Regístrate aquí
            </button>
            <a href="/forgot-password" className="d-block text-center">
              ¿Olvidó su contraseña?
            </a>
            {error && <p className="text-danger text-center">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
