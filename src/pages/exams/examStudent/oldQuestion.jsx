import { green } from "@mui/material/colors";
import React from "react";
import "./exam.css";

const OldQuestion = ({ questionInfo }) => {
  console.log("questionInfo", questionInfo);
  return (
    <div>
      <p>{questionInfo.question}</p>
      {questionInfo.numberOfAnswer
        ? questionInfo.numberOfAnswer.map((answer, index) => (
            <div
              style={{
                display: "flex",
                backgroundColor:
                  questionInfo.correctAnswer.includes(`${index}`) &&
                  questionInfo.studentAnswer.includes(`${index}`)
                    ? "green"
                    : questionInfo.studentAnswer.includes(`${index}`)
                    ? "red"
                    : questionInfo.correctAnswer.includes(`${index}`)
                    ? "green"
                    : null,
                marginBottom: "3px",
              }}
              key={index}
            >
              <input type={questionInfo.questionType} value={index} />
              <p>{answer.answerLabel}</p>
            </div>
          ))
        : null}
    </div>
  );
};
export default OldQuestion;
