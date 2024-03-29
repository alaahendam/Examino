import React, { useState } from "react";
import DarkMode from "../../../component/DarkMode/DarkMode";
import "./exam.css";
import { useNavigate } from "react-router";
import Question from "./question";
import Timer from "../../../component/timer/timer";
import { useForm, useFieldArray } from "react-hook-form";
import API from "../../../utilities/api";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import MainButton from "../../../component/button/button";
import NavBar from "../../../component/navBar/navBar";
const Exam = ({ examInfo, timerInfo, setOpenExam }) => {
  const login = useSelector((state) => state.login.login);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
  const onSubmit = async (values) => {
    try {
      examInfo.questions.map((info) => {
        info.studentAnswer = values[info.id];
      });
      let { data } = await API.put("/studentExam/submitExam", {
        userId: login.id,
        examId: examInfo.id,
        answers: examInfo.questions,
        points: examInfo.points,
      });
      if (data) {
        toast.success("تم اضافة الاجابات بنجاح");
        setOpenExam(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const time = new Date();
  // min = 60 sec
  time.setSeconds(time.getSeconds() + timerInfo * 60);

  return (
    <div style={{ height: "100vh" }}>
      <NavBar />
      <div className="Bbody" style={{ marginTop: "30px" }}>
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
          <MainButton type="submit" text={"submit"} />
        </form>
      </div>
    </div>
  );
};
export default Exam;
