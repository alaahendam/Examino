import React from "react";
import { dateParser, parseToDateTime } from "../../../utilities/date";
const ExamPreview = ({ examData }) => {
  return (
    <div className="examPreview">
      <div className="ExamInfo ExamStructureInfo examPrevie2">
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", width: "60%" }}>
            <p
              style={{
                color: "#a840d1",
                fontWeight: "600",
                marginRight: "10px",
              }}
            >
              Exam Name :
            </p>
            <p>{examData.examName}</p>
          </div>
          <div style={{ display: "flex", width: "45%" }}>
            <p
              style={{
                color: "#a840d1",
                fontWeight: "600",
                marginRight: "10px",
              }}
            >
              Duration :
            </p>
            <p>{examData.duration}</p>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", width: "60%" }}>
            <p
              style={{
                color: "#a840d1",
                fontWeight: "600",
                marginRight: "10px",
              }}
            >
              Start Exam :
            </p>
            <p>{dateParser(examData.startDate)}</p>
          </div>
          <div style={{ display: "flex", width: "45%" }}>
            <p
              style={{
                color: "#a840d1",
                fontWeight: "600",
                marginRight: "10px",
              }}
            >
              End Exam :
            </p>
            <p>{dateParser(examData.endDate)}</p>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", width: "60%" }}>
            <p
              style={{
                color: "#a840d1",
                fontWeight: "600",
                marginRight: "10px",
              }}
            >
              Exam Level :
            </p>
            <p>{JSON.parse(examData.level).name}</p>
          </div>
          <div style={{ display: "flex", width: "45%" }}>
            <p
              style={{
                color: "#a840d1",
                fontWeight: "600",
                marginRight: "10px",
              }}
            >
              Exam Points :
            </p>
            <p>{examData.totalPointes}</p>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <p
            style={{
              color: "#a840d1",
              fontWeight: "600",
              marginRight: "10px",
            }}
          >
            Chapters :{" "}
          </p>
          {examData.chosenChapters.map((chapter) => (
            <p style={{ marginRight: "5px" }}>{chapter}</p>
          ))}
        </div>
        <div>
          {examData?.examQuestion
            ? examData?.examQuestion?.map((question, index) => {
                return (
                  <div
                    className="QuestionReview"
                    key={index}
                    style={{
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <p>{`Q${index + 1} )`}</p>
                        <p>{question.question}</p>
                      </div>
                      <p>{`( ${question.difficulty} )`}</p>
                      <p>{`Points:( ${question.pointes} )`}</p>
                    </div>
                    <form
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                      }}
                    >
                      {question.numberOfAnswer.map((answer, index) => (
                        <div style={{ display: "flex" }} key={index}>
                          <input
                            disabled
                            type={question.questionType}
                            name="questionReview"
                            defaultChecked={
                              question.correctAnswer
                                ? question.correctAnswer.includes(String(index))
                                  ? true
                                  : false
                                : null
                            }
                          />
                          <label>{answer.answerLabel}</label>
                        </div>
                      ))}
                    </form>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};
export default ExamPreview;
