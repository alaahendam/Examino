import React from "react";
import { qBank } from "./Questionsbank";
import { useState } from "react";
import "./QuestionDesign.css";
export default function QueistionDesign() {
  const [score, setScore] = useState(0);

  const [selected, setSelected] = useState("mohamed");

  //  const handleAnswer =(answerr) =>{
  //    {answerr == selected ? setScore(score+1) : null}
  //  }

  return (
    <div className="container mt-3">
      {qBank.map((Q) => (
        <div>
          <h4>
            {Q.questionId} {Q.question}
          </h4>
          <form>
            {/* {qBank.answers.map((answer =>
                ))} */}
            <div className="form-group">
              <div className="form-check">
                {Q.answers.map((answer) => (
                  <div style={{ marginTop: "0.5" }}>
                    <div className="BTNgroup">
                      <label>
                        <input
                          type="radio"
                          value={answer}
                          name="question"
                          onChange={(e) => setSelected(e.target.value)}
                          onClick={() => {
                            if (selected == Q.correct) {
                              return setScore(score + 1);
                            } else {
                              return null;
                            }
                          }}
                        />
                        &nbsp;
                        {answer}
                      </label>
                    </div>
                    <br />
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      ))}
      <div className="mt-3">
        <button type="submit" className="btn btn-dark">
          Send
        </button>
        {selected}
        {/* {score} */}
      </div>
    </div>
  );
}

// {data.map((user) => (
//     <div className="user">{user}</div>
//   ))}
