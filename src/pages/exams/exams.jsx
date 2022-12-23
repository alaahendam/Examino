import React, { useState, useEffect } from "react";
import "./exams.css";
import { useSelector, useDispatch } from "react-redux";
import examImg from "../../images/exam.png";
import HorizontalLinearStepper from "../../component/stepper/stepper";
import { useForm, useFieldArray } from "react-hook-form";
import ExamInfo from "./examInfo";
import ExamCondition from "./examCondition";
import ExamPreview from "./examPreview";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import success from "../../images/success.jpg";
const Exams = () => {
  const login = useSelector((state) => state.login.login);
  const [activeTab, setActiveTab] = useState("activeExam");
  const [activeArrayExam, setActiveArrayExam] = useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const handleNext = async () => {
    const isStepValid = await trigger();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // if (isStepValid) {
    //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // } else {
    //   toast.error("يرجي إدخال جميع البيانات ");
    // }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    trigger,
  } = useForm({
    shouldUnregister: false,
    mode: "onChange",
  });
  const arrayField = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "conditions", // unique name for your Field Array
  });
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
    console.log(data);
    handleNext();
  };
  const ExamsDetails = [
    <ExamInfo register={register} />,
    <ExamCondition mainRegister={register} arrayField={arrayField} />,
    <ExamPreview register={register} />,
  ];
  return (
    <div>
      {login.role == "Teacher" ? (
        <form className="examStructure" onSubmit={handleSubmit(onSubmit)}>
          <div className="examStructureBody">
            <HorizontalLinearStepper steps={steps} activeStep={activeStep} />
            {ExamsDetails[activeStep]}
            <div className="finalExamStep">
              {activeStep === steps.length ? (
                <img src={success} className="successImg" />
              ) : null}
            </div>
            {activeStep === steps.length ? null : (
              <React.Fragment>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    pt: 2,

                    height: "60px",
                    padding: "0px 10px",
                  }}
                >
                  <input
                    type="button"
                    value="Back"
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    style={{
                      borderImage:
                        "linear-gradient(100deg, rgb(168, 64, 209), rgb(86, 209, 212)) 7 / 3 / 0 stretch",
                      cursor: "pointer",
                      width: "100px",
                      height: "40px",
                      backgroundColor: "white",
                      color: "black",
                    }}
                  />
                  <Box sx={{ flex: "1 1 auto" }} />
                  {activeStep === steps.length - 2 ? (
                    <input
                      type="submit"
                      value="Next Page"
                      style={{
                        background: "linear-gradient(100deg,#A840D1, #56D1D4)",
                        color: "white",
                        cursor: "pointer",
                        width: "100px",
                        height: "40px",
                      }}
                    />
                  ) : (
                    <Button
                      onClick={handleNext}
                      sx={{
                        background: "linear-gradient(100deg,#A840D1, #56D1D4)",
                        color: "white",
                        cursor: "pointer",
                        width: "100px",
                        height: "40px",
                      }}
                    >
                      {activeStep === steps.length - 1 ? "Done" : "Next Page"}
                    </Button>
                  )}
                </Box>
              </React.Fragment>
            )}
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
