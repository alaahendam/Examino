import React from "react";
import "./examStructure.css";
const ExamInfo = ({ register }) => {
  return (
    <div className="ExamInfo ExamStructureInfo">
      <div>
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
export default ExamInfo;
