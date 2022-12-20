import React, { useState } from "react";
import "./questionBank.css";
import QuestionMaker from "../../component/questionMaker/questionMaker";
import Dialog from "@mui/material/Dialog";

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
  const [newLevel, setNewLevel] = useState(false);
  const [openChapterQuestion, setOpenChapterQuestion] = useState("");
  const [levels, setLevels] = useState([]);
  const [chapters, setChapters] = useState([
    { label: "chapter1", value: "chapter1" },
    { label: "chapter2", value: "chapter2" },
  ]);

  const handleClick = (chapter) => {
    if (chapter == openChapterQuestion) {
      setOpenChapterQuestion("");
    } else {
      setOpenChapterQuestion(chapter);
    }
  };
  const handelAddNewLevel = (e) => {
    e.preventDefault();
    setLevels([...levels, { label: levelName, value: levelName }]);
    setNewLevel(false);
  };
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
        {levels.map((level) => (
          <div className="levelDiv" onClick={() => setOpenChapters(true)}>
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
          />
          <input type={"submit"} value="Add Level" className="btn" />
        </form>
      </Dialog>
      <Dialog
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
          {chapters.map((chapter) => (
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              component="nav"
            >
              <ListItemButton onClick={() => handleClick(chapter.value)}>
                <ListItemText primary={`${chapter.label}`} />
                {openChapterQuestion == chapter.value ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItemButton>
              <Collapse
                in={openChapterQuestion == chapter.value}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary={`${chapter.label} is active`} />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          ))}
        </div>
      </Dialog>
    </div>
  );
};
export default QuestionBank;
