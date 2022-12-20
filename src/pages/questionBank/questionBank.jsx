import React, { useState } from "react";
import "./questionBank.css";
import QuestionMaker from "../../component/questionMaker/questionMaker";
import Dialog from "@mui/material/Dialog";
import NavBar from "../../component/navBar/navBar";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

const QuestionBank = () => {
  const [openChapters, setOpenChapters] = useState(false);
  const [levelName, setLevelName] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [newLevel, setNewLevel] = useState(false);
  const [openChapterQuestion, setOpenChapterQuestion] = useState(null);
  const [levels, setLevels] = useState([]);

  const handleClick = (chapter) => {
    console.log("chapter");
    console.log(chapter);
    if (chapter == openChapterQuestion) {
      setOpenChapterQuestion(null);
    } else {
      setOpenChapterQuestion(chapter);
    }
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

    setLevels(tempArray);
  };
  console.log("levels");
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
        {levels.map((level, index) => (
          <div
            className="levelDiv"
            onClick={() =>
              setOpenChapters({ levelIndex: index, openChapterDialog: true })
            }
          >
            {level.label}
          </div>
        ))}
      </div>
      <Dialog
        maxWidth={"md"}
        fullWidth={true}
        open={newLevel}
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
        open={openChapters}
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
                    <QuestionMaker
                      handelAddNewQuestion={handelAddNewQuestion}
                    />
                  </Collapse>
                </List>
              ))
            : null}
        </div>
      </Dialog>
    </div>
  );
};
export default QuestionBank;
