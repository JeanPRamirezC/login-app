import React, { useState } from "react";
import { loginUser } from "../services/api"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      Correo: email, // Asegúrate de que 'email' es el valor de correo
      Contrasenia: password, // Asegúrate de que 'password' es el valor de la contraseña
    };

    try {
      const response = await loginUser(loginData); // Llamar la función con el JSON correcto
      console.log(response);
      navigate("/dashboard"); // Redirige al dashboard
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
