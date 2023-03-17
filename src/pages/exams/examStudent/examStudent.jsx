import React, { useState, useEffect } from "react";
import "../exams.css";
import Dialog from "@mui/material/Dialog";
import examImg from "../../../images/exam.png";
import API from "../../../utilities/api";
import { useSelector, useDispatch } from "react-redux";
import Exam from "./exam";
import OldExam from "./oldExam";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const ExamStudent = () => {
  const login = useSelector((state) => state.login.login);
  const [activeTab, setActiveTab] = useState("activeExam");
  const [activeArrayExam, setActiveArrayExam] = useState(null);
  const [activeExam, setActiveExam] = useState(null);
  const [futureExam, setFutureExam] = useState(null);
  const [oldExam, setOldExam] = useState(null);
  const [openExam, setOpenExam] = useState(false);
  const [openOldExam, setOpenOldExam] = useState(false);
  const [examInfo, setExamInfo] = useState(null);
  const [timerInfo, setTimerInfo] = useState(null);

  const [loading, setLoading] = useState(false);

  const ExamTabs = [
    { label: "Old Exam", value: "oldExam" },
    { label: "Active Exam", value: "activeExam" },
    { label: "Future Exam", value: "futureExam" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let { data } = await API.post("/exam/studentExams", {
          id: login.id,
        });
        setLoading(false);
        setFutureExam(data.futureExam);
        setActiveExam(data.activeExam);
        setOldExam(data.oldExam);
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
  const handelOpenExam = async (exam) => {
    try {
      let { data } = await API.post("/studentExam/create", {
        userId: login.id,
        examId: exam.id,
        examName: exam.examName,
        points: exam.points,
        answers: exam.questions,
        examEnd: exam.end,
      });
      if (
        Math.abs(new Date().getTime() - new Date(data.startAt).getTime()) /
          (1000 * 60) >=
        exam.duration
      ) {
        toast.error("تم الإنتهاء من الإمتحان من قبل");
      } else {
        setOpenExam(true);
        setExamInfo(exam);
        setTimerInfo(
          exam.duration -
            Math.abs(new Date().getTime() - new Date(data.startAt).getTime()) /
              (1000 * 60)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelOpenOldExam = (exam) => {
    setOpenOldExam(true);
    setExamInfo(exam);
  };
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
      {loading ? (
        <>
          <br /> <br />
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </>
      ) : (
        <div className="examTabInfo">
          {activeArrayExam
            ? activeArrayExam.map((exam, index) => (
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
                  {activeTab === "futureExam" ? (
                    <p
                      style={{
                        fontSize: "14px",
                        color: "gray",
                      }}
                    >
                      start at: {new Date(exam.start).toLocaleString()}
                    </p>
                  ) : activeTab === "activeExam" ? (
                    <p
                      style={{
                        fontSize: "14px",
                        color: "gray",
                      }}
                    >
                      end at: {new Date(exam.end).toLocaleString()}
                    </p>
                  ) : (
                    <div>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "gray",
                        }}
                      >
                        start Exam at: {new Date(exam.startAt).toLocaleString()}
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "gray",
                        }}
                      >
                        submit at: {new Date(exam.endAt).toLocaleString()}
                      </p>
                    </div>
                  )}

                  {activeTab === "oldExam" ? (
                    <p
                      className="exambtnInfo"
                      onClick={() => handelOpenOldExam(exam)}
                    >
                      View Result
                    </p>
                  ) : activeTab === "activeExam" ? (
                    <p
                      className="exambtnInfo"
                      onClick={() => handelOpenExam(exam)}
                    >
                      Start Exam
                    </p>
                  ) : null}
                </div>
              ))
            : null}
        </div>
      )}

      <Dialog
        maxWidth={"lg"}
        fullWidth={true}
        fullScreen
        open={openExam ? true : false}
        onClose={() => setOpenExam(false)}
      >
        <Exam
          examInfo={examInfo}
          timerInfo={timerInfo}
          setOpenExam={setOpenExam}
        />
      </Dialog>
      <Dialog
        maxWidth={"lg"}
        fullWidth={true}
        fullScreen
        open={openOldExam ? true : false}
        onClose={() => setOpenOldExam(false)}
      >
        <OldExam examInfo={examInfo} />
      </Dialog>
    </div>
  );
};
export default ExamStudent;
