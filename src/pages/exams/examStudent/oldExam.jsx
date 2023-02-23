import { defaultListboxReducer } from "@mui/base";
import React from "react";
import DarkMode from "../../../component/DarkMode/DarkMode";
import OldQuestion from "./oldQuestion";
import "./exam.css";

const OldExam = ({ examInfo }) => {
  console.log("exam  info", examInfo);
  return (
    <div className="Bbody">
      <div style={{ textAlign: "right" }}>
        <DarkMode />
      </div>
      <div>
        <h3>{examInfo.examName}</h3>
        {examInfo
          ? examInfo.answers.map((info, index) => (
              <OldQuestion questionInfo={info} />
            ))
          : null}
      </div>
    </div>
  );
};
export default OldExam;
