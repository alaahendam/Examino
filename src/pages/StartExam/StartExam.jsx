import React from "react";
import "./StartExam.css";
import image from "../../images/startexam.webp"
function StartExam(){
    return(
        <div>
          <div  className="startExam">
            <img src={image}></img>
            <div className="paragraph">
            <p>
                the Exam consists of 6 parts,each part has a supmitt button,
                if you click on it, you cannot return to the same page again
                the Exam consists of 6 parts,each part has a button
            </p>
            </div>
            <button className="buttonn"> Start The Exam Now</button>
          </div>
        </div>
    )
}
export default StartExam;