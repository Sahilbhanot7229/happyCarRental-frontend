import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Managing user authentication
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [admin, setAdminUser] = useState(JSON.parse(localStorage.getItem("Admin")));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Login for user
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Login for admin
  const loginAsAdmin = (userData) => {
    localStorage.setItem("Admin", JSON.stringify(userData));
    setAdminUser(userData);
  };

  // Function for logout
  const logout = () => {
    // Removing user data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("Admin");
    setUser(null);
    setAdminUser(null);
    navigate("/login"); // Navigate to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, admin, login, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
