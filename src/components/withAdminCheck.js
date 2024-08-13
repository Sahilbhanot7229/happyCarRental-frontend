import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const withAdminCheck = (WrappedComponent) => {
  return (props) => {
    const { isAdmin } = useAuth();

    if (!isAdmin()) {
      return <Navigate to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminCheck;
