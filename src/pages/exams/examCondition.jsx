import React from "react";
import "./examStructure.css";

const ExamCondition = ({ register }) => {
  const QuestionType = [
    { label: "Choose Correct Answer", value: "ChooseCorrectAnswer" },
    { label: "Choose Multi Correct Answer", value: "ChooseMultiCorrectAnswer" },
    { label: "True False", value: "True_False" },
    { label: "Long Essay", value: "LongEssay" },
    { label: "Short Essay", value: "ShortEassay" },
  ];
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
          <select {...register("ExamType", { required: true })}>
            <option value="radio">radio</option>
            <option value="checkbox">checkbox</option>
            <option value="radio">true & false</option>
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
                {...register(`${question.value}`, { required: true })}
                placeholder={question.label}
              />
            ))}
          </div>
        </div>
        <input
          type="text"
          placeholder="Exam Name"
          {...register("ExamName", { required: true })}
          style={{
            paddingLeft: "10px",
          }}
        />
        <select {...register("ExamType", { required: true })}>
          <option value="radio">radio</option>
          <option value="checkbox">checkbox</option>
          <option value="radio">true & false</option>
        </select>
      </div>
      <input
        type="number"
        placeholder="Duration"
        {...register("Duration", { required: true })}
        style={{
          paddingLeft: "10px",
        }}
      />
      <label
        style={{
          paddingLeft: "5px",
          marginTop: "10px",
        }}
      >
        Exam Start
      </label>
      <div>
        <input
          type="date"
          placeholder="Exam Name"
          {...register("startDate", { required: true })}
          style={{
            paddingLeft: "10px",
          }}
        />
        <input
          type="time"
          placeholder="Exam Name"
          {...register("startTime", { required: true })}
          style={{
            paddingLeft: "10px",
          }}
        />
      </div>
      <label
        style={{
          paddingLeft: "5px",
          marginBottom: "10px",
        }}
      >
        Exam End
      </label>
      <div>
        <input
          type="date"
          placeholder="Exam Name"
          {...register("endDate", { required: true })}
          style={{
            paddingLeft: "10px",
          }}
        />
        <input
          type="time"
          placeholder="Exam Name"
          {...register("endTime", { required: true })}
          style={{
            paddingLeft: "10px",
          }}
        />
      </div>
    </div>
  );
};
export default ExamCondition;
