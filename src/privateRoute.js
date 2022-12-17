import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const PrivateRoute = (element, role) => {
  const login = useSelector((state) => state.login.login);
  if (login && login.role == role) {
    return element;
  } else if (!login && role == "SignIn") {
    return element;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default PrivateRoute;
