import React from "react";
import "./signIn.css";
import loginIcon from "../../images/Login-amico.png";

const SignIn = () => {
  return (
    <div className="signIn">
      <div className="signInInfo">
        <img src={loginIcon} alt="" srcset="" />
        <p className="welcome">Welcome Back To Examino !</p>
        <p
          style={{
            fontSize: "12px",
          }}
        >
          sign in to enter your account
        </p>
        <input type="text" />
        <input type="password" />
        <input
          type="submit"
          value="Sign In"
          style={{
            background: "linear-gradient(100deg,#A840D1, #56D1D4)",
            color: "white",
          }}
        />
      </div>
    </div>
  );
};
export default SignIn;
