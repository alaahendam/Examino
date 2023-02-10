import React, { useState } from "react";
import "./signIn.css";
import { useForm } from "react-hook-form";
import loginIcon from "../../images/Login-amico.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addLogin, deleteLogin } from "../../redux/features/loginSlice";
import API from "../../utilities/api";
const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();
  const login = useSelector((state) => state.login.login);
  const usersData = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  var findLoginFlag = false;
  const onSubmit = async (values) => {
    console.log(values);
    let { data } = await API.post("/user/login", values);
    console.log(data);
    window.localStorage.setItem("token", data.token);
    dispatch(addLogin(data.data));
    navigate("/exams");
  };

  return (
    <div className="signIn">
      <div className="signInInfo">
        <img src={loginIcon} alt="" srcset="" />
        <p className="welcome">Welcome Back To Examino !</p>
        <p
          style={{
            fontSize: "12px",
            marginBottom: "15px",
          }}
        >
          sign in to enter your account
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="User Name"
            {...register("name", { required: true })}
            style={{
              paddingLeft: "10px",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            style={{
              paddingLeft: "10px",
            }}
          />
          <p
            style={{
              fontSize: "10px",
              marginBottom: "15px",
            }}
          >
            forgot password ?
          </p>
          <input
            type="submit"
            value="Sign In"
            style={{
              background: "linear-gradient(100deg,#A840D1, #56D1D4)",
              color: "white",
              cursor: "pointer",
            }}
          />
          <p
            style={{
              fontSize: "13px",
              marginBottom: "15px",
            }}
          >
            create account ?{" "}
            <a
              style={{
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                textDecorationLine: "underline",
              }}
              onClick={() => navigate("/signUp")}
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
