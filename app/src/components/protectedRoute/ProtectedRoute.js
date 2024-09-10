import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../api/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Navigate to="/logIn" />;
  }
  return children;
};

export default ProtectedRoute;
