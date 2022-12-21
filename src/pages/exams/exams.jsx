import React, { useState, useEffect } from "react";
import "./exams.css";
import { useSelector, useDispatch } from "react-redux";
import examImg from "../../images/exam.png";
import HorizontalLinearStepper from "../../component/stepper/stepper";
const Exams = () => {
  const login = useSelector((state) => state.login.login);
  const [activeTab, setActiveTab] = useState("activeExam");
  const [activeArrayExam, setActiveArrayExam] = useState(null);
  const ExamTabs = [
    { label: "Old Exam", value: "oldExam" },
    { label: "Active Exam", value: "activeExam" },
    { label: "Future Exam", value: "futureExam" },
  ];
  const oldExam = [
    { examName: "old1", examdate: "2022-03-25" },
    { examName: "old2", examdate: "2022-03-25" },
    { examName: "old1", examdate: "2022-03-25" },
    { examName: "old2", examdate: "2022-03-25" },
    { examName: "old1", examdate: "2022-03-25" },
    { examName: "old2", examdate: "2022-03-25" },
    { examName: "old1", examdate: "2022-03-25" },
  ];
  const activeExam = [
    { examName: "active1", examdate: "2022-03-25" },
    { examName: "active2", examdate: "2022-03-25" },
  ];
  const futureExam = [
    { examName: "future1", examdate: "2022-03-25" },
    { examName: "future2", examdate: "2022-03-25" },
  ];
  useEffect(() => {
    if (activeTab == "oldExam") {
      setActiveArrayExam(oldExam);
    } else if (activeTab == "activeExam") {
      setActiveArrayExam(activeExam);
    } else {
      setActiveArrayExam(futureExam);
    }
  }, [activeTab]);
  return (
    <div>
      {login.role == "Teacher" ? (
        <div>
          <HorizontalLinearStepper />
        </div>
      ) : (
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
                      tab.value == activeTab
                        ? "linear-gradient(100deg,#A840D1, #56D1D4)"
                        : null,
                    color: tab.value == activeTab ? "white" : null,
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
                      style={{
                        width: "50%",
                        height: "50%",
                      }}
                    />
                    <p>{exam.examName}</p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "gray",
                      }}
                    >
                      {exam.examdate}
                    </p>
                    {activeTab == "oldExam" ? (
                      <p className="exambtnInfo">View Result</p>
                    ) : activeTab == "activeExam" ? (
                      <p className="exambtnInfo">Start Exam</p>
                    ) : null}
                  </div>
                ))
              : null}
          </div>
        </div>
      )}
    </div>
  );
};
export default Exams;
