import React from "react";
import "./exams.css";
import { useSelector } from "react-redux";
import ExamStudent from "./examStudent/examStudent";
import ExamTeacher from "./examTeacher/examTeacher";

// import { toast } from "react-toastify";

const Exams = () => {
  const login = useSelector((state) => state.login.login);

  return (
    <div>
      {login && login.role === "Teacher" ? <ExamTeacher /> : <ExamStudent />}
    </div>
  );
};
export default Exams;
