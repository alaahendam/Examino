import React, { useState } from "react";
import "./questionMaker.css";
import { useForm } from "react-hook-form";

const QuestionMaker = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [numberOfQuestion, setNumberOfQuestion] = useState([]);
  console.log(numberOfQuestion)
  console.log(numberOfQuestion)
  return (
    <div className="QuestionMaker">
      <div className="header"></div>
      <div>
        <textarea
          type="text"
          placeholder="Write a comment..."
          name="content"
          required
        />
        <input
          type="button"
          value="Add Answer"
          style={{
            background: "linear-gradient(100deg,#A840D1, #56D1D4)",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => setNumberOfQuestion([...numberOfQuestion, "1"])}
        />
      </div>
    </div>
  );
};
export default QuestionMaker;
