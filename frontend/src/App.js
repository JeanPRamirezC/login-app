import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NewRegister from "./components/NewRegister";
import NewUser from "./components/NewUser";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newRegister" element={<NewRegister />} />
        <Route path="/newUser" element={<NewUser />} />
      </Routes>
    </Router>
  );
}

export default App;
