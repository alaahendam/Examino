import React, { useState, useEffect } from "react";
import API from "../../../utilities/api";
import "./studentScore.css";
const StudentsScore = ({ examId }) => {
  const [examData, setExamData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await API.get(
        `studentExam/StudentsExamResult/${examId}`
      );
      setExamData(data);
    };
    fetchData();
  }, []);
  return (
    <div className="studentsScore">
      {examData?.map((exam) => (
        <div className="studentsScoreCard">
          <div>
            <p>name : {exam.user.name}</p>
            <p>email : {exam.user.email}</p>
            <p>telePhone : {exam.user.telephone}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p>
              points : {exam.score}/{exam.points}
            </p>
            <p>grade : {exam.grade}%</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default StudentsScore;
