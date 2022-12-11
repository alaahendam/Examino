import React from "react";
import "./signUp.css";
import student from "../../images/student.png";
import teacher from "../../images/teacher.png";
const SignUp = () => {
  return (
    <div className="signUp">
      <p className="welcome">Welcome To Examino !</p>
      <p
        style={{
          fontSize: "12px",
          marginBottom: "15px",
        }}
      >
        sign up to create your account
      </p>
      <div
        style={{
          display: "flex",
        }}
      >
        <img src={teacher} alt="" srcset="" />
        <img src={student} alt="" srcset="" />
      </div>
      <input
        type="text"
        placeholder="user name"
        style={{
          paddingLeft: "10px",
        }}
      />
      <input
        type="text"
        placeholder="ID"
        style={{
          paddingLeft: "10px",
        }}
      />
      <input
        type="email"
        placeholder="Email Address"
        style={{
          paddingLeft: "10px",
        }}
      />
      <input
        type="telephone"
        placeholder="Telephone"
        style={{
          paddingLeft: "10px",
        }}
      />
      <input
        type="password"
        placeholder="Password"
        style={{
          paddingLeft: "10px",
        }}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        style={{
          paddingLeft: "10px",
        }}
      />
      <input
        type="button"
        value="Sign In"
        style={{
          background: "linear-gradient(100deg,#A840D1, #56D1D4)",
          color: "white",
          cursor: "pointer",
        }}
      />
    </div>
  );
};
export default SignUp;
