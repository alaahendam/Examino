import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import Student from "../../images/student.png";
import Teacher from "../../images/teacher.png";
const SignUp = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(0);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const inputField = [
    { type: "text", placeholder: "user name", name: "userName" },
    { type: "number", placeholder: "ID", name: "id" },
    { type: "email", placeholder: "Email Address", name: "emailAddress" },
    { type: "text", placeholder: "Telephone", name: "telephone" },
    { type: "password", placeholder: "Password", name: "password" },
    {
      type: "password",
      placeholder: "Confirm Password",
      name: "confirmPassword",
    },
  ];
  const userTypeField = [Teacher, Student];
  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signUp">
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
        {userTypeField.map((field, index) => (
          <div
            style={{
              cursor: "pointer",
              marginBottom: "17px",
            }}
            onClick={() => setUserType(index)}
          >
            <img src={field} alt="" srcset="" />
            <p
              style={{
                fontSize: "12px",
                textAlign: "center",
                textDecoration: userType == index ? "underline" : "none",
                fontWeight: userType == index ? 600 : 500,
              }}
            >
              {index == 0 ? "Teacher" : "Student"}
            </p>
          </div>
        ))}
      </div>
      {inputField.map((inputData) => (
        <input
          type={inputData.type}
          placeholder={inputData.placeholder}
          {...register(`${inputData.name}`, { required: true })}
          style={{
            paddingLeft: "10px",
          }}
        />
      ))}
      <input
        type="submit"
        value="Sign Up"
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
        You Have an Account ?{" "}
        <a
          style={{
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            textDecorationLine: "underline",
          }}
          onClick={() => navigate("/signIn")}
        >
          Sign In
        </a>
      </p>
    </form>
  );
};
export default SignUp;
