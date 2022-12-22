import React from "react"
import { qBank } from "./Questionsbank"
import "./QuestionDesign.css"
export default function QueistionDesign() {
  return (
    <div className="container mt-3">
      {qBank.map((Q) => ( 
        <div>

         <h4>{Q.questionId} {Q.question}</h4>
         <form>
            {/* {qBank.answers.map((answer =>
                ))} */}
           <div className="form-group">
             <div className="form-check">
              {Q.answers.map((answer =>
              <div style={{marginTop:"0.5"}}>
                <div className="BTNgroup" >
                  <input
                  type="checkbox"
                  name="selectCheckbox"
                  id="selectCheckbox"
                />
                <label style={{paddingLeft:"0.4rem"}} htmlFor="chooseCb" className="form-check-label">
                  {answer}
                </label>
                </div><br />
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
           </div>
    </div>
  )
}
  
// {data.map((user) => (
//     <div className="user">{user}</div>
//   ))}
    