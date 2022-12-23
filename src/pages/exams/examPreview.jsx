import React from "react";

const ExamPreview = ({}) => {
  const QuestionType = [
    { label: "Choose Correct Answer", value: "ChooseCorrectAnswer" },
    { label: "Choose Multi Correct Answer", value: "ChooseMultiCorrectAnswer" },
    { label: "True False", value: "True_False" },
    { label: "Long Essay", value: "LongEssay" },
    { label: "Short Essay", value: "ShortEassay" },
  ];
  return (
    <div className="examPreview">
      <div className="ExamInfo ExamStructureInfo examPrevie2">
        <div className="examPreviewDiv">
          <p>Exam Name: English Exam 1</p>
          <p>Exam Type: Test</p>
        </div>
        <p>Duration: 15 </p>
        <p
          style={{
            color: "#a840d1",
            fontWeight: "600",
          }}
        >
          Start Exam
        </p>
        <div className="examPreviewDivDate">
          <p>Date : 23/3/2021</p>
          <p>Time: 9 Pm</p>
        </div>
        <p
          style={{
            color: "#a840d1",
            fontWeight: "600",
          }}
        >
          End Exam
        </p>
        <div className="examPreviewDivDate">
          <p>Date : 23/3/2021</p>
          <p>Time: 9 Pm</p>
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <p
            style={{
              color: "#a840d1",
              fontWeight: "600",
            }}
          >
            Exam Points :
          </p>
          <p>60</p>
        </div>
        <div>
          {QuestionType.map((type) => (
            <div
              style={{
                display: "flex",
              }}
            >
              <p
                style={{
                  fontWeight: "600",
                }}
              >
                {`${type.label}`} :
              </p>
              <p>60 for each Question</p>
            </div>
          ))}
        </div>
        <p
          style={{
            color: "#a840d1",
            fontWeight: "600",
          }}
        >
          Conditions
        </p>
        <div>
          undefined Question of type undefined from chapter undefined Difficulty
          undefined
        </div>
      </div>
    </div>
  );
};
export default ExamPreview;
