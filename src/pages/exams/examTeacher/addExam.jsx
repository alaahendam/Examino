import React, { useState, useEffect } from "react";
import "../exams.css";
import { useSelector, useDispatch } from "react-redux";
import HorizontalLinearStepper from "../../../component/stepper/stepper";
import { useForm, useFieldArray } from "react-hook-form";
import ExamInfo from "./examInfo";
import ExamCondition from "./examCondition";
import ExamPreview from "./examPreview";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import success from "../../../images/success.jpg";
import API from "../../../utilities/api";
const AddExam = ({ setExamsData, examsData, setOpenCreateExam }) => {
  const login = useSelector((state) => state.login.login);
  console.log("login", login);
  const [activeStep, setActiveStep] = React.useState(0);
  const [examData, setExamData] = useState(null);
  const [level, setLevel] = useState("");
  const [examQuestion, setExamQuestion] = useState(null);
  const [totalPointes, setTotalPointes] = useState(0);
  const [chosenChapters, setChosenChapters] = useState(null);

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      if (activeStep == 1) {
        if (examQuestion && examQuestion.length) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          toast.error("يبدو أنك نسيت إضافة بعض الأسئلة ");
        }
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      toast.error("يرجي إدخال جميع البيانات ");
    }
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

  const steps = ["Exam Information", "Exam Condition", "Exam Preview"];

  const onSubmit = (data) => {
    setExamData({
      ...data,
      chosenChapters: chosenChapters,
      examQuestion: examQuestion,
      totalPointes: totalPointes,
    });
    handleNext();
  };
  const ExamsDetails = [
    <ExamInfo register={register} setLevel={setLevel} />,
    <ExamCondition
      level={level}
      setExamQuestion={setExamQuestion}
      setTotalPointes={setTotalPointes}
      examQuestion={examQuestion}
      totalPointes={totalPointes}
      chosenChapters={chosenChapters}
      setChosenChapters={setChosenChapters}
    />,
    <ExamPreview register={register} examData={examData} />,
  ];
  console.log("activeStep", activeStep);
  const handleSaveExam = async () => {
    console.log({ ...examData, level: JSON.parse(examData.level) });
    try {
      let { data } = await API.post("/exam/create", {
        ...examData,
        level: JSON.parse(examData.level),
        ownerId: Number(login.id),
      });
      console.log(data);
      if (data) {
        setExamsData([...examsData, data]);
        setOpenCreateExam(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="examStructure" onSubmit={handleSubmit(onSubmit)}>
      <div className="examStructureBody">
        <HorizontalLinearStepper steps={steps} activeStep={activeStep} />
        {ExamsDetails[activeStep]}

        {activeStep === steps.length ? (
          <div className="finalExamStep">
            <img src={success} className="successImg" />
            <div>
              <input
                type="button"
                value="Delete"
                style={{
                  backgroundColor: "#ff4e4e",
                  color: "white",
                  cursor: "pointer",
                  width: "100px",
                  height: "40px",
                  marginLeft: "5px",
                }}
              />
              <input
                type="button"
                value="Edit"
                style={{
                  background: "linear-gradient(100deg,#A840D1, #56D1D4)",
                  color: "white",
                  cursor: "pointer",
                  width: "100px",
                  height: "40px",
                  marginLeft: "5px",
                }}
                onClick={() => setActiveStep(0)}
              />
              <input
                type="button"
                value="Save"
                onClick={handleSaveExam}
                style={{
                  backgroundColor: "#4abd4a",
                  color: "white",
                  cursor: "pointer",
                  width: "100px",
                  height: "40px",
                  marginLeft: "5px",
                }}
              />
            </div>
          </div>
        ) : null}

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
                <input
                  type="button"
                  value={activeStep === steps.length - 1 ? "Done" : "Next Page"}
                  onClick={handleNext}
                  style={{
                    background: "linear-gradient(100deg,#A840D1, #56D1D4)",
                    color: "white",
                    cursor: "pointer",
                    width: "100px",
                    height: "40px",
                  }}
                />
              )}
            </Box>
          </React.Fragment>
        )}
      </div>
    </form>
  );
};
export default AddExam;
