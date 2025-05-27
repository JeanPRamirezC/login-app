import React, { useState } from "react";
import { loginUser } from "../services/api"; // Asegúrate que esté bien importado
import { useNavigate } from "react-router-dom";
import { roleRoutes } from "../components/roleRoutes"; // Mapa de rol → ruta

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      Correo: email,
      Contrasenia: password
    };

    try {
      const response = await loginUser(loginData);

      // 🔐 Guardar datos de sesión
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("rol", response.rol); // ejemplo: "Administrador"
      sessionStorage.setItem("usuarioId", response.usuarioId);

      // 🚀 Redirigir según rol usando el mapa
      const path = roleRoutes[response.rol];
      if (path) {
        navigate(path);
      } else {
        navigate("/unauthorized"); // Fallback si no hay ruta para el rol
      }
    } catch (err) {
      setError("Credenciales incorrectas");
      console.error(err);
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
          </form>
          {error && <p className="text-danger text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
