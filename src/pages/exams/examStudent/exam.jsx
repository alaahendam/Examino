import React, { useState } from "react";
import DarkMode from "../../../component/DarkMode/DarkMode";
import "./exam.css";
import { useNavigate } from "react-router";
import Question from "./question";
import Timer from "../../../component/timer/timer";
import { useForm, useFieldArray } from "react-hook-form";
import API from "../../../utilities/api";
import { useSelector, useDispatch } from "react-redux";

const Exam = ({ examInfo, timerInfo }) => {
  const login = useSelector((state) => state.login.login);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
  const onSubmit = async (values) => {
    console.log(values);
    examInfo.questions.map((info) => {
      info.studentAnswer = values[info.id];
    });
    let { data } = await API.put("/studentExam/submitExam", {
      userId: login.id,
      examId: examInfo.id,
      answers: examInfo.questions,
      points: examInfo.points,
    });
    console.log(data);
  };
  const time = new Date();
  // min = 60 sec
  time.setSeconds(time.getSeconds() + timerInfo * 60);

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
          ? examInfo.questions.map((info, index) => (
              <Question
                {...info}
                register={register}
                control={control}
                key={index}
              />
            ))
          : null}
        <input type="submit" value={"submit"} className="btn" />
      </form>
    </div>
  );
};
export default Exam;
