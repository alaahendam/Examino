import React, { useState } from "react";
import "./signIn.css";
import loginIcon from "../../images/Login-amico.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handelLogin = () => {
    if (!userName) {
      toast.error("أدخل أسم المستخدم");
    }
    if (!password) {
      toast.error("أدخل رقم المرور");
    }
    if (userName && password) {
      toast("يمكنك الدخول");
    }
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
        <input
          type="text"
          value={userName}
          placeholder="user name"
          style={{
            paddingLeft: "10px",
          }}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          style={{
            paddingLeft: "10px",
          }}
          onChange={(e) => setPassword(e.target.value)}
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
          type="button"
          value="Sign In"
          style={{
            background: "linear-gradient(100deg,#A840D1, #56D1D4)",
            color: "white",
            cursor: "pointer",
          }}
          onClick={handelLogin}
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
      </div>
    </div>
  );
};
export default SignIn;
