import React, { useState, useEffect } from "react";
import "./questionBank.css";
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

const QuestionBank = () => {
  const [openChapters, setOpenChapters] = useState(false);
  const [chapterInfo, setChapterInfo] = useState([]);
  const [levelName, setLevelName] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [newLevel, setNewLevel] = useState(false);
  const [openChapterQuestion, setOpenChapterQuestion] = useState(null);
  const [levels, setLevels] = useState([]);
  const [editQuestion, setEditQuestion] = useState(false);
  const [editData, setEditData] = useState(null);
  const [questionEditIndex, setQuestionEditIndex] = useState(null);
  useEffect(() => {
    if (
      levels[openChapters.levelIndex] &&
      levels[openChapters.levelIndex].chapters[openChapterQuestion]
    ) {
      setChapterInfo(
        levels[openChapters.levelIndex].chapters[openChapterQuestion].question
      );
    }
  }, [chapterInfo]);
  const handleClick = (chapter) => {
    if (chapter == openChapterQuestion) {
      setOpenChapterQuestion(null);
    } else {
      setOpenChapterQuestion(chapter);
    }
    setChapterInfo(levels[openChapters.levelIndex].chapters[chapter].question);
  };
  const handelAddNewLevel = (e) => {
    e.preventDefault();
    setLevels([...levels, { label: levelName, value: levelName }]);
    setNewLevel(false);
  };
  const handelAddNewChapter = (e) => {
    e.preventDefault();
    let tempArray = [...levels];
    if (!tempArray[openChapters.levelIndex].chapters) {
      tempArray[openChapters.levelIndex].chapters = [];
    }
    tempArray[openChapters.levelIndex].chapters = [
      ...tempArray[openChapters.levelIndex].chapters,
      { chapterName: chapterName, question: [] },
    ];

    setLevels(tempArray);
  };
  const handelAddNewQuestion = (questionData) => {
    let tempArray = [...levels];
    tempArray[openChapters.levelIndex].chapters[openChapterQuestion].question =
      [
        ...tempArray[openChapters.levelIndex].chapters[openChapterQuestion]
          .question,
        questionData,
      ];
    setChapterInfo(
      tempArray[openChapters.levelIndex].chapters[openChapterQuestion].question
    );
    setLevels(tempArray);
  };

  const deleteQuestion = (QuestionIndex) => {
    let tempArray = [...levels];
    const newTempArray = chapterInfo.filter((info, index) => {
      return index != QuestionIndex;
    });
    tempArray[openChapters.levelIndex].chapters[openChapterQuestion].question =
      newTempArray;
    setChapterInfo(newTempArray);
    setLevels(tempArray);
  };
  const handelEditData = (data, index) => {
    setEditQuestion(!editQuestion);
    setEditData(data);
    setQuestionEditIndex(index);
  };
  const handelEditOldQuestion = (questionData) => {
    let tempArray = [...levels];
    tempArray[openChapters.levelIndex].chapters[openChapterQuestion].question[
      questionEditIndex
    ] = questionData;

    setLevels(tempArray);
    setChapterInfo(null);
    // setChapterInfo(
    //   tempArray[openChapters.levelIndex].chapters[openChapterQuestion].question
    // );
  };
  // Dont Forget Veno Partner .....
  console.log(levels);

  return (
    <div className="QuestionBank">
      <div>
        <input
          type={"button"}
          value="Add A New Level"
          className="btn"
          onClick={() => setNewLevel(true)}
        />
      </div>
      <div className="levelsDivs">
        {levels.length == 0 ? (
          <div className="levelsImg">
            <img src={levelImg} />
          </div>
        ) : (
          levels.map((level, index) => (
            <div
              className="levelDiv"
              onClick={() =>
                setOpenChapters({
                  levelIndex: index,
                  openChapterDialog: true,
                })
              }
              key={index}
            >
              {level.label}
            </div>
          ))
        )}
      </div>
      <Dialog
        maxWidth={"md"}
        fullWidth={true}
        open={newLevel ? true : false}
        onClose={() => setNewLevel(false)}
      >
        <form
          style={{
            height: "88vh",
          }}
          className="newLevelDiv"
          onSubmit={handelAddNewLevel}
        >
          <p>Add A New Level !</p>
          <input
            type="text"
            placeholder="Pleace Set Level Name"
            onChange={(e) => setLevelName(e.target.value)}
            required
          />
          <input type={"submit"} value="Add Level" className="btn" />
        </form>
      </Dialog>
      <Dialog
        fullScreen
        maxWidth={"md"}
        fullWidth={true}
        open={openChapters ? true : false}
        onClose={() => setOpenChapters(false)}
      >
        <div
          style={{
            height: "88vh",
          }}
        >
          <NavBar />
          <form
            className="chapterFrom"
            onSubmit={handelAddNewChapter}
            style={{
              paddingTop: "50px",
            }}
          >
            <input
              required
              type="text"
              placeholder="Pleace Set Chapter Name"
              onChange={(e) => setChapterName(e.target.value)}
            />
            <input type={"submit"} value="Add A New Chapter" className="btn" />
          </form>
          {levels[openChapters.levelIndex] &&
          levels[openChapters.levelIndex].chapters
            ? levels[openChapters.levelIndex].chapters.map((chapter, index) => (
                <List
                  sx={{
                    width: "100%",

                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  key={index}
                >
                  <ListItemButton onClick={() => handleClick(index)}>
                    <ListItemText primary={`${chapter.chapterName}`} />
                    {openChapterQuestion == index ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItemButton>
                  <Collapse
                    in={openChapterQuestion == index}
                    timeout="auto"
                    unmountOnExit
                  >
                    <QuestionMaker handelQuestion={handelAddNewQuestion} />
                    {chapterInfo
                      ? chapterInfo.map((question, index) => (
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
                                  onClick={() =>
                                    handelEditData(question, index)
                                  }
                                />
                                <MdDeleteOutline
                                  style={{
                                    marginLeft: "10px",
                                    fontSize: "30px",
                                    color: "#A840D1",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => deleteQuestion(index)}
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
        </div>
      </Dialog>
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
    </div>
  );
};
export default QuestionBank;
