import React, { useState, useEffect } from "react";
import "./examStructure.css";
import { useForm, useFieldArray } from "react-hook-form";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import API from "../../../utilities/api";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { BiEditAlt } from "react-icons/bi";

const ExamCondition = ({ mainRegister, arrayField }) => {
  const login = useSelector((state) => state.login.login);
  const [level, setLevel] = useState("");
  const [levels, setLevels] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [condition, setCondition] = useState({});
  const [openChapters, setOpenChapters] = useState(false);
  const [chapterQuestions, setChapterQuestions] = useState(null);
  const [chosenChapters, setChosenChapters] = useState(null);
  const [openChapterQuestion, setOpenChapterQuestion] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    trigger,
  } = useForm();
  useEffect(() => {
    console.log("levels", login.ownedLevels);
    setLevels(login.ownedLevels);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data } = await API.post("/level/levelInfo", {
          ownerId: login.id,
          levelName: level,
        });
        console.log(data[0].chapters);
        setChapters(data[0].chapters);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [level]);
  const QuestionType = [
    { label: "Choose Correct Answer", value: "ChooseCorrectAnswer" },
    { label: "Choose Multi Correct Answer", value: "ChooseMultiCorrectAnswer" },
    { label: "True False", value: "True_False" },
    { label: "Long Essay", value: "LongEssay" },
    { label: "Short Essay", value: "ShortEassay" },
  ];

  const collectCondition = () => {
    arrayField.append(condition);
  };

  const handelChaptersCheckbox = (data, e) => {
    e.preventDefault();
    console.log(data.chaptersCheckbox);
    setChosenChapters(data.chaptersCheckbox);
  };
  const handleClick = (chapter) => {
    if (chapter == openChapterQuestion) {
      setOpenChapterQuestion(null);
    } else {
      setOpenChapterQuestion(chapter);
    }
  };
  console.log(chosenChapters);
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
            Q1)What level do you want to take exam ?
          </label>
          <select
            {...mainRegister("Level", { required: true })}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option disabled selected value>
              {" "}
              Select Level{" "}
            </option>
            {levels
              ? levels.map((level) => (
                  <option value={`${level.name}`}>{level.name}</option>
                ))
              : null}
          </select>
        </div>
        {chapters ? (
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
              Q2)Which Chapter You Want In This Exam ?
            </label>
            <form
              style={{
                display: "flex",
              }}
            >
              {chapters.map((chapter, index) => (
                <div>
                  <label htmlFor="">{chapter.name}</label>
                  <input
                    type="checkbox"
                    value={chapter.name}
                    {...register("chaptersCheckbox")}
                  />
                </div>
              ))}
              <input
                type="submit"
                value={"test"}
                onClick={handleSubmit(handelChaptersCheckbox)}
              />
            </form>
          </div>
        ) : null}
        {chapters && chosenChapters
          ? chapters.map((chapter, index) =>
              chosenChapters.includes(chapter.name) ? (
                <List
                  sx={{
                    width: "100%",

                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  key={index}
                >
                  <ListItemButton onClick={() => handleClick(chapter.id)}>
                    <ListItemText primary={`${chapter.name}`} />
                    {openChapterQuestion === chapter.id ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItemButton>
                  <Collapse
                    in={openChapterQuestion === chapter.id}
                    timeout="auto"
                    unmountOnExit
                  >
                    {chapterQuestions
                      ? chapterQuestions.map((question, index) => (
                          <div className="QuestionReview" key={index}>
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                }}
                              >
                                <p>{`Q${index + 1} )`}</p>
                                <p>{question.question}</p>
                              </div>
                              <p>{`( ${question.difficulty} )`}</p>
                            </div>
                            <form
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                              }}
                            >
                              {question.numberOfAnswer.map((answer, index) => (
                                <div style={{ display: "flex" }} key={index}>
                                  <input
                                    type={question.questionType}
                                    name="questionReview"
                                    defaultChecked={
                                      question.correctAnswer
                                        ? question.correctAnswer.includes(
                                            String(index)
                                          )
                                          ? true
                                          : false
                                        : null
                                    }
                                  />
                                  <label>{answer.answerLabel}</label>
                                </div>
                              ))}
                            </form>
                          </div>
                        ))
                      : null}
                  </Collapse>
                </List>
              ) : null
            )
          : null}
        {/* <div
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
            {QuestionType.map((question, index) => (
              <input
                className="QuestionTypePoint"
                type="number"
                {...mainRegister(`${question.value}`, { required: true })}
                placeholder={question.label}
                key={index}
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
              <option value="level1" disabled>
                Choose Chapter
              </option>
              <option value="radio">radio</option>
              <option value="checkbox">checkbox</option>
              <option value="radio">true & false</option>
            </select>
            <select
              onChange={(e) =>
                setCondition({ ...condition, type: e.target.value })
              }
            >
              <option value="level1" disabled>
                Choose Type
              </option>
              <option value="radio">radio</option>
              <option value="checkbox">checkbox</option>
              <option value="radio">true & false</option>
            </select>
            <select
              onChange={(e) =>
                setCondition({ ...condition, difficulty: e.target.value })
              }
            >
              <option value="level1" disabled>
                Choose Difficulty
              </option>
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
              style={{
                background: "linear-gradient(100deg,#A840D1, #56D1D4)",
                color: "white",
                cursor: "pointer",
              }}
            />
          </div>
          <div className="conditionGroub">
            {arrayField.fields.map((field, index) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={index}
              >
                <p>{`${arrayField.fields[index].number} Question of type ${arrayField.fields[index].type} from chapter ${arrayField.fields[index].chapter} Difficulty ${arrayField.fields[index].difficulty}`}</p>
                <MdDeleteOutline
                  onClick={() => arrayField.remove(index)}
                  style={{
                    fontSize: "23px",
                    cursor: "pointer",
                    color: "#A840D1",
                    marginLeft: "15px",
                  }}
                />
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default ExamCondition;
