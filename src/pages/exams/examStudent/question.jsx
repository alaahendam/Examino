import React from "react";
import "./exam.css";

const Question = ({
  id,
  numberOfAnswer,
  question,
  questionType,
  register,
  control,
}) => {
  return (
    <div>
      <p>{question}</p>
      {numberOfAnswer
        ? numberOfAnswer.map((answer, index) => (
            <div
              style={{
                display: "flex",
              }}
            >
              <input
                type={questionType}
                value={index}
                control={control}
                {...register(`${id}`, { required: true })}
              />
              <p>{answer.answerLabel}</p>
            </div>
          ))
        : null}
    </div>
  );
};
export default Question;
