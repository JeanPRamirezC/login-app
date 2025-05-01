import React, { useState, useEffect } from "react";
import { getUsuarios } from "../services/api"; // Obtener los usuarios

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsuarios();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Usuarios Registrados</h2>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user.nombre} - {user.correo}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewUsers;
