import React from "react";

const ExamCondition = ({ register }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Exam Condition"
        {...register("ExamCondition")}
        style={{
          paddingLeft: "10px",
        }}
      />
    </div>
  );
};
export default ExamCondition;
