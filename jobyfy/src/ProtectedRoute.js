import { Spin } from "antd";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  console.log(isAuthenticated, "i am here");
  const ComponentWithSpinnerWrapper = () => {
    if (!isAuthenticated) {
      return (
        <div className="spinner__container">
          <Spin />
        </div>
      );
    }
    return <Component {...rest} />;
  };

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
