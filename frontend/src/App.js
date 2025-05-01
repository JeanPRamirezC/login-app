import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NewRegister from "./components/NewRegister";
import ChangePassword from "./components/ChangePassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newRegister" element={<NewRegister />} />
        <Route path="/forgot-password" element={<ChangePassword />} />
      </Routes>
    </Router>
  );
}

export default App;
