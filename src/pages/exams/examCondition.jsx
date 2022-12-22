import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "./examStructure.css";

const ExamCondition = ({ mainRegister, arrayField }) => {
  const [level, setLevel] = useState("");
  const QuestionType = [
    { label: "Choose Correct Answer", value: "ChooseCorrectAnswer" },
    { label: "Choose Multi Correct Answer", value: "ChooseMultiCorrectAnswer" },
    { label: "True False", value: "True_False" },
    { label: "Long Essay", value: "LongEssay" },
    { label: "Short Essay", value: "ShortEassay" },
  ];
  const level1 = [];
  const level2 = [];
  const level3 = [];
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
  };
  return (
    <div className="ExamInfo ExamStructureInfo">
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label
            style={{
              paddingLeft: "5px",
              marginTop: "10px",
            }}
          >
            Q1)What level do you want to take exams ?
          </label>
          <select
            {...mainRegister("Level", { required: true })}
            onChange={(e) => setLevel(e.target.level)}
          >
            <option value="level1">Level 1</option>
            <option value="level2">Level 2</option>
            <option value="level3">Level 3</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label
            style={{
              paddingLeft: "5px",
              marginTop: "10px",
            }}
          >
            Q2)How Many Points Do You Want For Each Question ?
          </label>
          <div>
            {QuestionType.map((question) => (
              <input
                className="QuestionTypePoint"
                type="number"
                {...mainRegister(`${question.value}`, { required: true })}
                placeholder={question.label}
              />
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label
            style={{
              paddingLeft: "5px",
              marginTop: "10px",
            }}
          >
            Select Condetion
          </label>
          <form className="SelectConditon" onSubmit={handleSubmit(onSubmit)}>
            <select {...register("ExamType1", { required: true })}>
              <option value="radio">radio</option>
              <option value="checkbox">checkbox</option>
              <option value="radio">true & false</option>
            </select>
            <select {...register("ExamType2", { required: true })}>
              <option value="radio">radio</option>
              <option value="checkbox">checkbox</option>
              <option value="radio">true & false</option>
            </select>
            <select {...register("ExamType3", { required: true })}>
              <option value="radio">radio</option>
              <option value="checkbox">checkbox</option>
              <option value="radio">true & false</option>
            </select>

            <input
              type="number"
              {...register("numberOfQuestion5", { required: true })}
              placeholder="Number Of Question"
            />
            <input type="submit" value="Save Conditon" />
          </form>
        </div>
      </div>
    </div>
  );
};
export default ExamCondition;
