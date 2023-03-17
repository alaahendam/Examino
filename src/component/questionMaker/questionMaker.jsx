import React, { useState } from "react";
import "./questionMaker.css";
import { useForm, useFieldArray } from "react-hook-form";
import { BsCardImage } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import MainButton from "../button/button";
const QuestionMaker = ({ handelQuestion, editFlag, editData }) => {
  const [questionType, setQuestionType] = useState(
    editFlag ? editData.questionType : "radio"
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    resetField,
    setValue,
    watch,
  } = useForm({
    defaultValues: editFlag ? editData : null,
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "numberOfAnswer", // unique name for your Field Array
    }
  );

  const onSubmit = (data) => {
    console.log(data);
    handelQuestion(data);
    // reset();
    // setQuestionType("radio");
    remove();
    console.log(data);
    remove();
    resetField("correctAnswer");
  };
  const handelQuestionTypeChange = (type) => {
    setQuestionType(type);
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
          onChange={(e) => handelQuestionTypeChange(e.target.value)}
        >
          <option value="radio">Choose Correct Answer</option>
          <option value="checkbox">Choose Multi Correct Answer</option>
          <option value="radio">True & False</option>
        </select>
        <div>
          <label>pointes</label>
          <input type="number" {...register(`pointes`, { required: true })} />
        </div>
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
          <MainButton
            type="button"
            text="Add Answer"
            onClick={() => append({})}
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
              key={index}
            >
              <input
                type={questionType}
                id={`${index}`}
                value={index}
                control={control}
                {...register(`correctAnswer`, { required: true })}
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
      <MainButton
        type="submit"
        text={editFlag ? "Save Edit" : "Submit"}
        style={{ position: "absolute", bottom: "10px", right: "30px" }}
      />
    </form>
  );
};
export default QuestionMaker;
