import React, { useState, useEffect } from "react";
import "../exams.css";
import Dialog from "@mui/material/Dialog";
import examImg from "../../../images/exam.png";
import API from "../../../utilities/api";
import { useSelector, useDispatch } from "react-redux";
import Exam from './exam'
// import { toast } from "react-toastify";

const ExamStudent = () => {
  const login = useSelector((state) => state.login.login);
  console.log(login)
  const [activeTab, setActiveTab] = useState("activeExam");
  const [activeArrayExam, setActiveArrayExam] = useState(null);
  const [activeExam,setActiveExam]=useState(null)
  const [futureExam,setFutureExam]=useState(null)
  const [openExam,setOpenExam]=useState(false)

  const ExamTabs = [
    { label: "Old Exam", value: "oldExam" },
    { label: "Active Exam", value: "activeExam" },
    { label: "Future Exam", value: "futureExam" },
  ];
  const oldExam = [
    { examName: "old1", examdate: "2022-03-25" },
    { examName: "old2", examdate: "2022-03-25" },
    { examName: "old1", examdate: "2022-03-25" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data } = await API.post("/exam/studentExams", {
          id:login.id
        });
          console.log(data)
          setFutureExam(data.futureExam)
          setActiveExam(data.activeExam)
          setActiveArrayExam(data.activeExam);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (activeTab === "oldExam") {
      setActiveArrayExam(oldExam);
    } else if (activeTab === "activeExam") {
      setActiveArrayExam(activeExam);
    } else {
      setActiveArrayExam(futureExam);
    }
  }, [activeTab]);

  return (
    <div className="Exams">
      <div className="examsHeader">
        <p>Exams</p>
        <div
          style={{
            display: "flex",
          }}
        >
          {ExamTabs.map((tab, index) => (
            <div
              className="examTab"
              style={{
                background:
                  tab.value === activeTab
                    ? "linear-gradient(100deg,#A840D1, #56D1D4)"
                    : null,
                color: tab.value === activeTab ? "white" : null,
              }}
              key={index}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </div>
          ))}
        </div>
      </div>
      <div className="examTabInfo">
        {activeArrayExam
          ? activeArrayExam.map((exam, index) => (
              <div className="examCard" key={index}>
                <img
                  src={examImg}
                  alt=""
                  style={{
                    width: "50%",
                    height: "50%",
                  }}
                />
                <p>{exam.examName}</p>
                {activeTab ==="futureExam"?(<p
                  style={{
                    fontSize: "14px",
                    color: "gray",
                  }}
                >
                  start at: {new Date(exam.start).toLocaleString()}
                </p>):(<p
                  style={{
                    fontSize: "14px",
                    color: "gray",
                  }}
                >
                  end at: {new Date(exam.end).toLocaleString()}
                </p>)}
                
                {activeTab === "oldExam" ? (
                  <p className="exambtnInfo">View Result</p>
                ) : activeTab === "activeExam" ? (
                  <p className="exambtnInfo" onClick={()=>setOpenExam(true)}>Start Exam</p>
                ) : null}
              </div>
            ))
          : null}
      </div>
      <Dialog
        maxWidth={"md"}
        fullWidth={true}
        open={openExam ? true : false}
        onClose={() => setOpenExam(false)}
      >
        <Exam />
      </Dialog>
    </div>
  );
};
export default ExamStudent;
