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
import Certificate from "./pages/certificate/certificate";
import PrivateRoute from "./privateRoute";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "./firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { addUsers } from "./redux/features/usersSlice";

function App() {
  const usersData = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const users = await getDocs(usersCollectionRef);
      dispatch(
        addUsers(users.docs.map((doc) => ({ ...doc.data(), docId: doc.id })))
      );
    };
    getUsers();
  }, []);
  console.log(usersData);
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={PrivateRoute(<SignIn />, "SignIn")} />
        <Route path="/signUp" element={PrivateRoute(<SignUp />, "SignIn")} />
        <Route path="/about" element={<About />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/exams" element={PrivateRoute(<Exams />, "Teacher")} />
        <Route path="/scores" element={PrivateRoute(<Scores />, "Student")} />
        <Route
          path="/questionBank"
          element={PrivateRoute(<QuestionBank />, "Teacher")}
        />
        <Route
          path="/certificate"
          element={PrivateRoute(<Certificate />, "Teacher")}
        />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
