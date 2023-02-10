import React, { useEffect, useState } from "react";
import "./questionBankChapters.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import API from "../../utilities/api";

import QuestionMaker from "../../component/questionMaker/questionMaker";
import Dialog from "@mui/material/Dialog";
import NavBar from "../../component/navBar/navBar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import levelImg from "../../images/level3.jpg";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

const QuestionBankChapters = () => {
  const login = useSelector((state) => state.login.login);
  let { levelName } = useParams();
  const [chapters, setChapters] = useState(null);
  const [chapterName, setChapterName] = useState("");
  const [openChapters, setOpenChapters] = useState(false);
  const [chapterQuestions, setChapterQuestions] = useState(null);

  const [openChapterQuestion, setOpenChapterQuestion] = useState(null);
  const [editQuestion, setEditQuestion] = useState(false);
  const [editData, setEditData] = useState(null);
  const [questionEditIndex, setQuestionEditIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data } = await API.post("/level/levelInfo", {
          ownerId: login.id,
          levelName: levelName,
        });
        setChapters(data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
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
        console.log("tempArray", tempArray);
        setChapterQuestions(tempArray);
      } catch (error) {
        console.log(error);
      }
    };
    if (openChapterQuestion) {
      fetchData();
    }
  }, [openChapterQuestion]);
  const addChapter = async (e) => {
    e.preventDefault();
    try {
      let { data } = await API.post("/chapter/create", {
        name: chapterName,
        levelId: chapters.id,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (chapter) => {
    if (chapter == openChapterQuestion) {
      setOpenChapterQuestion(null);
    } else {
      setOpenChapterQuestion(chapter);
    }
  };

  const handelQuestion = async (questions) => {
    console.log(questions);
    try {
      let { data } = await API.post("/question/create", {
        chapterId: openChapterQuestion,
        difficulty: questions.difficulty,
        type: questions.questionType,
        details: questions,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handelEditData = (data) => {
    setEditQuestion(!editQuestion);
    setEditData(data);
    console.log("data", data);
  };
  const handelEditOldQuestion = async (questions) => {
    console.log(questions);
    try {
      let { data } = await API.put("/question/edit", {
        id: editData.id,
        difficulty: questions.difficulty,
        type: questions.questionType,
        details: questions,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        height: "88vh",
      }}
    >
      <NavBar />
      <form
        className="chapterFrom"
        style={{
          paddingTop: "50px",
        }}
        onSubmit={addChapter}
      >
        <input
          required
          type="text"
          placeholder="Pleace Set Chapter Name"
          onChange={(e) => setChapterName(e.target.value)}
        />
        <input type={"submit"} value="Add A New Chapter" className="btn" />
      </form>
      {chapters && chapters.chapters
        ? chapters.chapters.map((chapter, index) => (
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
                <QuestionMaker handelQuestion={handelQuestion} />
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
                          <div>
                            <BiEditAlt
                              style={{
                                fontSize: "30px",
                                color: "#A840D1",
                                cursor: "pointer",
                              }}
                              onClick={() => handelEditData(question)}
                            />
                            <MdDeleteOutline
                              style={{
                                marginLeft: "10px",
                                fontSize: "30px",
                                color: "#A840D1",
                                cursor: "pointer",
                              }}
                            />
                          </div>
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
          ))
        : null}
      {chapterQuestions ? (
        <Dialog
          maxWidth={"md"}
          fullWidth={true}
          open={editQuestion ? true : false}
          onClose={() => setEditQuestion(false)}
        >
          <QuestionMaker
            handelQuestion={handelEditOldQuestion}
            editFlag={true}
            editData={editData}
          />
        </Dialog>
      ) : null}
    </div>
  );
};
export default QuestionBankChapters;
