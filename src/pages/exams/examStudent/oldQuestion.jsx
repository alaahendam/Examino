import React from "react";
import "./exam.css";

const OldQuestion = ({ questionInfo }) => {
  return (
    <div
      style={{
        boxShadow: "2px 0px 8px 2px #4cf94c",
        padding: "22px",
        marginBottom: "17px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p>{questionInfo.question}</p>
        <p>
          {questionInfo.score} / {questionInfo.pointes} point
        </p>
      </div>
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
                height: "30px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                border: "1px solid gray",
                paddingLeft: "3px",
              }}
              key={index}
            >
              <input type={questionInfo.questionType} value={index} disabled />
              <p>{answer.answerLabel}</p>
            </div>
          ))
        : null}
    </div>
  );
};
export default OldQuestion;
