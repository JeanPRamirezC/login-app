import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import DashboardAdmin from "./components/DashboardAdmin";
import DashboardEmpleado from "./components/DashboardEmpleado";
import NewUser from "./components/NewUser";
import AsignarRol from "./components/AsignarRol";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/empleado" element={<DashboardEmpleado />} />
        <Route path="/newUser" element={<NewUser />} />
        <Route path="/asignarRol" element={<AsignarRol />} />
      </Routes>
    </Router>
  );
}

export default App;
