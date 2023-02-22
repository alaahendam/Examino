import React, { useState } from "react";
import DarkMode from "../../../component/DarkMode/DarkMode";
import "./exam.css";
import { useNavigate } from "react-router";
import Question from "./question";
import Timer from "../../../component/timer/timer";
import { useForm, useFieldArray } from "react-hook-form";

const Exam = ({ examInfo }) => {
  console.log("examInfo", examInfo);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    resetField,
    setValue,
    watch,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    examInfo.questions.map((info) => {
      info.studentAnswer = data[info.id];
    });
  };
  const time = new Date();

  // min = 60 sec
  time.setSeconds(time.getSeconds() + examInfo.duration * 60);

  return (
    <div className="Bbody">
      <div style={{ textAlign: "right" }}>
        <DarkMode />
      </div>
      <div>
        <Timer expiryTimestamp={time} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>{examInfo.examName}</h3>
        {examInfo
          ? examInfo.questions.map((info) => (
              <Question {...info} register={register} control={control} />
            ))
          : null}
        <input type="submit" value={"submit"} />
      </form>
    </div>
  );
};
export default Exam;
