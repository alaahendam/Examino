import React, { useState } from "react";

import "./examStructure.css";
import { MdDeleteOutline } from "react-icons/md";
const ExamCondition = ({ mainRegister, arrayField }) => {
  const [level, setLevel] = useState("");
  const [condition, setCondition] = useState({});
  const QuestionType = [
    { label: "Choose Correct Answer", value: "ChooseCorrectAnswer" },
    { label: "Choose Multi Correct Answer", value: "ChooseMultiCorrectAnswer" },
    { label: "True False", value: "True_False" },
    { label: "Long Essay", value: "LongEssay" },
    { label: "Short Essay", value: "ShortEassay" },
  ];
  const level1 = [];
  const level2 = [];
  const level3 = [];
  const collectCondition = () => {
    arrayField.append(condition);
  };
  console.log(condition);
  console.log(arrayField.fields);
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
          <select
            {...mainRegister("Level", { required: true })}
            onChange={(e) => setLevel(e.target.level)}
          >
            <option value="level1">Level 1</option>
            <option value="level2">Level 2</option>
            <option value="level3">Level 3</option>
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
                {...mainRegister(`${question.value}`, { required: true })}
                placeholder={question.label}
              />
            ))}
          </div>
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
            Select Condetion
          </label>
          <div className="SelectConditon">
            <select
              onChange={(e) =>
                setCondition({ ...condition, chapter: e.target.value })
              }
            >
              <option value="radio">radio</option>
              <option value="checkbox">checkbox</option>
              <option value="radio">true & false</option>
            </select>
            <select
              onChange={(e) =>
                setCondition({ ...condition, type: e.target.value })
              }
            >
              <option value="radio">radio</option>
              <option value="checkbox">checkbox</option>
              <option value="radio">true & false</option>
            </select>
            <select
              onChange={(e) =>
                setCondition({ ...condition, difficulty: e.target.value })
              }
            >
              <option value="radio">radio</option>
              <option value="checkbox">checkbox</option>
              <option value="radio">true & false</option>
            </select>

            <input
              type="number"
              placeholder="Number Of Question"
              onChange={(e) =>
                setCondition({ ...condition, number: e.target.value })
              }
            />
            <input
              type="button"
              value="Save Conditon"
              onClick={collectCondition}
            />
          </div>
          <div className="conditionGroub">
            {arrayField.fields.map((field, index) => (
              <div
                style={{
                  display: "flex",
                }}
              >
                <p>{`${arrayField.fields[index].number} Question of type ${arrayField.fields[index].type} from chapter ${arrayField.fields[index].chapter} Difficulty ${arrayField.fields[index].difficulty}`}</p>
                <MdDeleteOutline onClick={() => arrayField.remove(index)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExamCondition;
