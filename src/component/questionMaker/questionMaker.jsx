import React, { useState } from "react";
import "./questionMaker.css";
import { useForm, useFieldArray } from "react-hook-form";
import { BsCardImage } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const QuestionMaker = ({ handelAddNewQuestion }) => {
  const [questionType, setQuestionType] = useState("radio");
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "numberOfAnswer", // unique name for your Field Array
    }
  );
  // const [numberOfQuestion, setNumberOfQuestion] = useState([]);
  // console.log(numberOfQuestion);
  const onSubmit = (data) => {
    handelAddNewQuestion(data);
  };
  return (
    <form className="QuestionMaker" onSubmit={handleSubmit(onSubmit)}>
      <div className="header">
        <select {...register("difficulty", { required: true })}>
          <option value="Difficulty A">Difficulty A</option>
          <option value="Difficulty B">Difficulty B</option>
          <option value="Difficulty C">Difficulty C</option>
        </select>
        <select
          {...register("questionType", { required: true })}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <option value="radio">radio</option>
          <option value="checkbox">checkbox</option>
          <option value="radio">true & false</option>
        </select>
        <label htmlFor="uploadImgLabel">
          <BsCardImage
            style={{
              color: "#A840D1",
              fontSize: "20px",
              cursor: "pointer",
            }}
          />
        </label>
        <input
          id="uploadImgLabel"
          type="file"
          accept="image/*"
          multiple="false"
          {...register("uploadImgLabel")}
          style={{
            display: "none",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: "20px",
        }}
      >
        <textarea
          type="text"
          placeholder="Write a comment..."
          {...register(`question`)}
        />
        <div>
          <input
            type="button"
            className="btn"
            value="Add Answer"
            onClick={() => append(1)}
          />
        </div>
        <div className="questionField">
          {fields.map((field, index) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <input
                type={questionType}
                id={`${index}`}
                value={index}
                {...register(`correctAnswer`)}
              />
              <input
                type="text"
                style={{
                  width: "40%",
                  marginLeft: "10px",
                }}
                {...register(`numberOfAnswer.${index}.answerLabel`, {
                  required: true,
                })}
              />
              <AiOutlineClose
                style={{
                  marginLeft: "10px",
                  marginTop: "5px",
                }}
                onClick={() => remove(index)}
              />
            </div>
          ))}
        </div>
      </div>
      <input
        type="submit"
        className="btn"
        value="submit"
        style={{
          position: "absolute",
          bottom: "10px",
          right: "30px",
        }}
      />
    </form>
  );
};
export default QuestionMaker;
