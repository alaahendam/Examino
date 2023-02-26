import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import NavBar from "./component/navBar/navBar";
import Footer from "./component/footer/footer";
import Home from "./pages/home/home";
import SignIn from "./pages/signIn/signIn";
import SignUp from "./pages/signUp/signUp";
import About from "./pages/about/about";
import ContactUs from "./pages/contactUs/contactUs";
import Exams from "./pages/exams/exams";
import Scores from "./pages/scores/scores";
import QuestionBank from "./pages/questionBank/questionBank";
import QuestionBankChapters from "./pages/questionBankChapters/questionBankChapters";
import Certificate from "./pages/certificate/certificate";
import PrivateRoute from "./utilities/privateRoute";
import StartExam from "./pages/StartExam/StartExam";

import { addLogin, deleteLogin } from "./redux/features/loginSlice";

import API from "./utilities/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      API.post("/user/checkToken")
        .then((res) => {
          console.log("this dispatch work");
          console.log(res);
          dispatch(addLogin(res.data));
        })
        .catch((err) => {
          console.log(err);
          window.localStorage.clear();
          dispatch(addLogin(null));
          navigate("/");
        });
    } catch (error) {
      console.log(error);
      //window.localStorage.clear();
      navigate("/");
    }
  }, []);

  return (
    <div className="App">
      <NavBar />
      <div
        style={{
          paddingTop: "50px",
          paddingBottom: "30px",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signIn" element={PrivateRoute(<SignIn />, "SignIn")} />
          <Route path="/signUp" element={PrivateRoute(<SignUp />, "SignIn")} />
          <Route path="/about" element={<About />} />
          <Route path="/startexam" element={<StartExam />} />

          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/exams" element={PrivateRoute(<Exams />, "Both")} />
          <Route path="/scores" element={PrivateRoute(<Scores />, "Student")} />
          <Route
            path="/questionBank"
            element={PrivateRoute(<QuestionBank />, "Teacher")}
          />
          <Route
            path="/questionBank/:levelName"
            element={PrivateRoute(<QuestionBankChapters />, "Teacher")}
          />
          <Route
            path="/certificate"
            element={PrivateRoute(<Certificate />, "Student")}
          />
        </Routes>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
