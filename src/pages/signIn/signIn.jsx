import React, { useState } from "react";
import "./signIn.css";
import { useForm } from "react-hook-form";
import loginIcon from "../../images/Login-amico.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addLogin, deleteLogin } from "../../redux/features/loginSlice";
import API from "../../utilities/api";
import { toast } from "react-toastify";
import MainButton from "../../component/button/button";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
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
  const [loading, setLoading] = useState(false);
  var findLoginFlag = false;
  const onSubmit = async (values) => {
    try {
      setLoading(true);
      let { data } = await API.post("/user/login", values);
      window.localStorage.setItem("token", data.token);
      setLoading(false);
      dispatch(addLogin(data.data));
      navigate("/exams");
    } catch {
      toast.error("خطأ في اسم المستخدم أو كلمة المرور!");
    }
  };

  return (
    <div className="signIn">
      <div className="signInInfo">
        <img src={loginIcon} alt="" />
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
          <MainButton
            type="submit"
            text="Login"
            style={{
              margin: "0px",
              height: "45px",
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
      <Dialog
        maxWidth={"lg"}
        open={loading ? true : false}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            sx={{
              color: "#a840d1",
            }}
          />
        </div>
      </Dialog>
    </div>
  );
};
export default SignIn;
