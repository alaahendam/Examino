import React, { useState, useEffect } from "react";
import "../exams.css";

import HorizontalLinearStepper from "../../../component/stepper/stepper";
import { useForm, useFieldArray } from "react-hook-form";
import ExamInfo from "./examInfo";
import ExamCondition from "./examCondition";
import ExamPreview from "./examPreview";
import Box from "@mui/material/Box";

// import { toast } from "react-toastify";
import success from "../../../images/success.jpg";
const ExamTeacher = () => {
  const [activeStep, setActiveStep] = React.useState(0);

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

  const steps = ["Exam Information", "Exam Condition", "Exam Preview"];

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
export default ExamTeacher;
