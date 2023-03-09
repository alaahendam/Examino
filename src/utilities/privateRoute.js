import React, { useEffect } from "react";
import { Route, Navigate, json, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const PrivateRoute = (element, role) => {
  const login = useSelector((state) => state.login.login);
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  if (token) {
    if (login && login.role == role) {
      return element;
    } else if (login && role == "Both") {
      return element;
    } else if (login && role == "SignIn") {
      return <Navigate to="/" replace />;
    }
  } else if (!token && !login && role == "SignIn") {
    return element;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default PrivateRoute;
