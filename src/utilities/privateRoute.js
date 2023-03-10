import React from "react";
import { Route, Navigate, json } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const PrivateRoute = (element, role) => {
  const login = useSelector((state) => state.login.login);
  let token = localStorage.getItem("token");
  if (token) {
    if (login && login.role == role) {
      console.log("ok", login);
      return element;
    } else if (login && role == "Both") {
      console.log("both", login);
      return element;
    } else {
      console.log("default", login);
      return <Navigate to="/" replace />;
    }
  } else if (!login && role == "SignIn") {
    return element;
  } else {
    return <Navigate to="/about" replace />;
  }
};

export default PrivateRoute;
