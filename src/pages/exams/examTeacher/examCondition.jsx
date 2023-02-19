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
import { number } from "yup";

const ExamCondition = ({
  level,
  setExamQuestion,
  setTotalPointes,
  examQuestion,
  totalPointes,

  chosenChapters,
  setChosenChapters,
}) => {
  const login = useSelector((state) => state.login.login);
  const [chapters, setChapters] = useState(null);
  const [condition, setCondition] = useState({});
  const [openChapters, setOpenChapters] = useState(false);
  const [chapterQuestions, setChapterQuestions] = useState(null);
  const [openChapterQuestion, setOpenChapterQuestion] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      chaptersCheckbox: chosenChapters,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data } = await API.post("/level/levelInfo", {
          ownerId: login.id,
          levelName: JSON.parse(level).name,
          specialCode: JSON.parse(level).specialCode,
        });
        setChapters(data[0].chapters);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [level]);

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("ok this work");
        let { data } = await API.post("/question/getChapterQuestions", {
          chapterId: openChapterQuestion,
        });
        console.log(data);
        let tempArray = [];
        data.map((question) => {
          tempArray.push({
            ...question.details,
            difficulty: question.difficulty,
            questionType: question.type,
            id: question.id,
          });
        });
        setChapterQuestions(tempArray);
      } catch (error) {
        console.log(error);
      }
    };
    if (openChapterQuestion) {
      fetchData();
    }
  }, [openChapterQuestion]);

  const addQuestion = (question) => {
    let findFlag = -1;
    let tempArray = examQuestion;
    if (tempArray) {
      tempArray.map((questionObject, index) => {
        if (questionObject.id == question.id) {
          findFlag = index;
        }
      });
      if (findFlag !== -1) {
        setTotalPointes(totalPointes - Number(tempArray[findFlag].pointes));
        tempArray.splice(findFlag, 1);
        setExamQuestion([...tempArray]);
      } else {
        setExamQuestion([...tempArray, question]);
        setTotalPointes(totalPointes + Number(question.pointes));
      }
    } else {
      setExamQuestion([question]);
      setTotalPointes(totalPointes + Number(question.pointes));
    }
  };
  useEffect(() => {
    console.log("hello exam question", examQuestion);
  }, [examQuestion]);

  return (
    <div className="ExamInfo ExamStructureInfo">
      <div>
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
              Which Chapter You Want In This Exam ?
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
                    style={{ height: "20px", accentColor: "#A840D1" }}
                    type="checkbox"
                    value={chapter.name}
                    {...register("chaptersCheckbox")}
                  />
                </div>
              ))}
              <input
                type="submit"
                value={"Save"}
                onClick={handleSubmit(handelChaptersCheckbox)}
              />
            </form>
          </div>
        ) : null}
        <div style={{ display: "flex" }}>
          <p style={{ width: "50%" }}>Total Points : {totalPointes}</p>
          <p>
            Number Of Questions : {examQuestion ? examQuestion.length : null}
          </p>
        </div>
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
                      ? chapterQuestions.map((question, index) => {
                          let flag = false;
                          if (examQuestion) {
                            examQuestion.map((q) => {
                              if (q.id == question.id) {
                                flag = true;
                              }
                            });
                          }

                          return (
                            <div
                              className="QuestionReview"
                              key={index}
                              onClick={() => addQuestion(question)}
                              style={{
                                marginBottom: "16px",
                                boxShadow: flag
                                  ? "2px 0px 8px 2px #4cf94c"
                                  : null,
                              }}
                            >
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
                                <p>{`Points:( ${question.pointes} )`}</p>
                              </div>
                              <form
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  justifyContent: "space-between",
                                }}
                              >
                                {question.numberOfAnswer.map(
                                  (answer, index) => (
                                    <div
                                      style={{ display: "flex" }}
                                      key={index}
                                    >
                                      <input
                                        disabled
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
                                  )
                                )}
                              </form>
                            </div>
                          );
                        })
                      : null}
                  </Collapse>
                </List>
              ) : null
            )
          : null}
      </div>
    </div>
  );
};
export default ExamCondition;
