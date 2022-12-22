import React from "react";

const ExamInfo = ({ register }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Exam Name"
        {...register("ExamName", { required: true })}
        style={{
          paddingLeft: "10px",
        }}
      />
    </div>
  );
};
export default ExamInfo;
