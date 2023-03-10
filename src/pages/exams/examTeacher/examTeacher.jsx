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
const ExamTeacher = () => {
  const login = useSelector((state) => state.login.login);
  const [openCreateExam, setOpenCreateExam] = useState(false);
  const [openStudentsScore, setOpenStudentsScore] = useState(false);
  const [examsData, setExamsData] = useState(null);
  const [examId, setExamId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await API.get(`exam/getAllTeacherExams/${login.id}`);
      setExamsData(data);
      console.log("teacherExam", data);
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
      console.log(data);
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
      <button className="btn" onClick={() => setOpenCreateExam(true)}>
        add Exam
      </button>
      <div style={{ display: "flex" }}>
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
