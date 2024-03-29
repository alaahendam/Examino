import React, { useState, useEffect } from "react";
import "../exams.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import API from "../../../utilities/api";
import Dialog from "@mui/material/Dialog";
import AddExam from "./addExam";
import examImg from "../../../images/exam.png";
import StudentsScore from "./studentsScore";
import { AiOutlineDelete } from "react-icons/ai";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import {
  toIsoString,
  parseToDateTime,
  dateParser,
} from "../../../utilities/date";
import MainButton from "../../../component/button/button";
const ExamTeacher = () => {
  const login = useSelector((state) => state.login.login);
  const [openCreateExam, setOpenCreateExam] = useState(false);
  const [openStudentsScore, setOpenStudentsScore] = useState(false);
  const [examsData, setExamsData] = useState(null);
  const [examId, setExamId] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await API.get(`exam/getAllTeacherExams/${login.id}`);
      setExamsData(data);
      setLoading(false);
    };
    fetchData();
  }, []);
  const handleStudentsScore = (id) => {
    setExamId(id);
    setOpenStudentsScore(true);
  };
  const handleDeleteExam = async (id) => {
    try {
      const { data } = await API.delete(`/exam/deleteExam/${id}`);
      const tempArray = examsData.filter((exam) => {
        return exam.id != id;
      });
      setExamsData(tempArray);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "10px",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <MainButton text="add Exam" onClick={() => setOpenCreateExam(true)} />
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {examsData?.map((exam, index) => (
          <div className="examCard" key={index}>
            <img
              src={examImg}
              alt=""
              style={{
                width: "60px",
                height: "60px",
              }}
            />
            <p>{exam.examName}</p>
            <p
              style={{
                fontSize: "14px",
                color: "gray",
              }}
            >
              start at: {new Date(exam.start).toLocaleString()}
              {/* start at: {dateParser(exam.start)} */}
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "gray",
              }}
            >
              end at: {new Date(exam.end).toLocaleString()}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <p
                style={{
                  color: "#A840D1",
                  cursor: "pointer",
                }}
                onClick={() => handleStudentsScore(exam.id)}
              >
                عرض النتائج
              </p>
              <AiOutlineDelete
                style={{
                  fontSize: "24px",
                  color: "red",
                  cursor: "pointer",
                }}
                onClick={() => handleDeleteExam(exam.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <Dialog
        maxWidth={"lg"}
        fullWidth={true}
        open={openCreateExam ? true : false}
        onClose={() => setOpenCreateExam(false)}
      >
        <AddExam
          setExamsData={setExamsData}
          examsData={examsData}
          setOpenCreateExam={setOpenCreateExam}
        />
      </Dialog>
      <Dialog
        maxWidth={"lg"}
        fullWidth={true}
        open={openStudentsScore ? true : false}
        onClose={() => setOpenStudentsScore(false)}
      >
        <StudentsScore examId={examId} />
      </Dialog>
    </div>
  );
};
export default ExamTeacher;
