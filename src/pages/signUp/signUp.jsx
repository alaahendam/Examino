import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import Student from "../../images/student.png";
import Teacher from "../../images/teacher.png";
import { db } from "../../firebase/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import API from "../../utilities/api";
import { addLogin, deleteLogin } from "../../redux/features/loginSlice";
const SignUp = () => {
  const usersData = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const usersCollectionRef = collection(db, "users");
  const navigate = useNavigate();
  const [userType, setUserType] = useState("Teacher");
  const [userExist, setUserExist] = useState({
    name: true,
    userId: true,
    email: true,
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const inputField = [
    { type: "text", placeholder: "user name", name: "name" },
    { type: "number", placeholder: "ID", name: "userId" },
    { type: "email", placeholder: "Email Address", name: "email" },
    { type: "text", placeholder: "Telephone", name: "telephone" },
    { type: "password", placeholder: "Password", name: "password" },
    {
      type: "password",
      placeholder: "Confirm Password",
      name: "confirmPassword",
    },
  ];
  const userTypeField = [
    { label: "Teacher", logo: Teacher },
    { label: "Student", logo: Student },
  ];
  const onSubmit = async (data) => {
    try {
      if (userExist.name || userExist.userId || userExist.email) {
        toast.error("المستخدم موجود بالفعل");
      } else {
        delete data.confirmPassword;
        data.role = userType;
        let result = await API.post("/user/create", data);
        window.localStorage.setItem("token", result.data.token);
        dispatch(addLogin(result.data.data));
        navigate("/exams");
      }
    } catch {
      toast.error("المستخدم موجود بالفعل");
    }
  };
  const handelCheckUser = async (value, name) => {
    let tempData = {};
    if (!value) {
      tempData[name] = true;
      setUserExist({ ...userExist, ...tempData });
    } else {
      try {
        if (name == "userId") {
          tempData[name] = Number(value);
        } else {
          tempData[name] = value;
        }
        let { data } = await API.post("/user/checkUser", tempData);
        if (data) {
          tempData[name] = true;
          setUserExist({ ...userExist, ...tempData });
        }
      } catch (error) {
        tempData[name] = false;
        setUserExist({ ...userExist, ...tempData });
      }
    }
  };
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
        {userTypeField.map((type, index) => (
          <div
            style={{
              cursor: "pointer",
              marginBottom: "17px",
            }}
            onClick={() => setUserType(type.label)}
            key={index}
          >
            <img src={type.logo} alt="" />
            <p
              style={{
                fontSize: "12px",
                textAlign: "center",
                textDecoration: userType == type.label ? "underline" : "none",
                fontWeight: userType == type.label ? 600 : 500,
              }}
            >
              {type.label}
            </p>
          </div>
        ))}
      </div>
      {inputField.map((inputData, index) => (
        <input
          type={inputData.type}
          placeholder={inputData.placeholder}
          {...register(`${inputData.name}`, { required: true })}
          style={{
            paddingLeft: "10px",
          }}
          className={userExist[inputData.name] ? "userExist" : "userNotExist"}
          key={index}
          onChange={(e) =>
            index < 3 ? handelCheckUser(e.target.value, inputData.name) : null
          }
        />
      ))}
      <input
        className="btn"
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
