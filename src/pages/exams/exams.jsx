import React, { useState, useEffect } from "react";
import "./exams.css";
import { useSelector, useDispatch } from "react-redux";
import examImg from "../../images/exam.png";
import HorizontalLinearStepper from "../../component/stepper/stepper";
import { useForm } from "react-hook-form";
import ExamInfo from "./examInfo";
import ExamCondition from "./examCondition";
import ExamPreview from "./examPreview";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
const Exams = () => {
  const login = useSelector((state) => state.login.login);
  const [activeTab, setActiveTab] = useState("activeExam");
  const [activeArrayExam, setActiveArrayExam] = useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
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
  const activeExam = [
    { examName: "active1", examdate: "2022-03-25" },
    { examName: "active2", examdate: "2022-03-25" },
  ];
  const futureExam = [
    { examName: "future1", examdate: "2022-03-25" },
    { examName: "future2", examdate: "2022-03-25" },
  ];
  const steps = ["Exam Information", "Exam Condition", "Exam Preview"];
  useEffect(() => {
    if (activeTab == "oldExam") {
      setActiveArrayExam(oldExam);
    } else if (activeTab == "activeExam") {
      setActiveArrayExam(activeExam);
    } else {
      setActiveArrayExam(futureExam);
    }
  }, [activeTab]);
  const onSubmit = (data) => {
    handleNext();
    console.log(data);
  };
  const ExamsDetails = [
    <ExamInfo register={register} />,
    <ExamCondition register={register} />,
    <ExamPreview register={register} />,
  ];
  return (
    <div>
      {login.role == "Teacher" ? (
        <form className="examStructure" onSubmit={handleSubmit(onSubmit)}>
          <HorizontalLinearStepper steps={steps} activeStep={activeStep} />
          {activeStep === steps.length ? null : (
            <React.Fragment>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {activeStep === steps.length - 1 ? (
                  <input
                    type="submit"
                    value="Submit"
                    style={{
                      background: "linear-gradient(100deg,#A840D1, #56D1D4)",
                      color: "white",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <Button onClick={handleNext}>Next</Button>
                )}
              </Box>
            </React.Fragment>
          )}
          <div className="examStructureBody">
            {ExamsDetails[activeStep]}
            {}
          </div>
        </form>
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
