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
  const [levels, setLevels] = useState([
    { label: "level1", value: "level1" },
    { label: "level2", value: "level2" },
    { label: "level3", value: "level3" },
    { label: "level4", value: "level4" },
    { label: "level1", value: "level1" },
    { label: "level2", value: "level2" },
    { label: "level3", value: "level3" },
    { label: "level4", value: "level4" },
    { label: "level1", value: "level1" },
  ]);
  const [chapters, setChapters] = useState([
    { label: "chapter1", value: "chapter1" },
    { label: "chapter2", value: "chapter2" },
  ]);
  const [openChapterQuestion, setOpenChapterQuestion] = useState("");

  const handleClick = (chapter) => {
    if (chapter == openChapterQuestion) {
      setOpenChapterQuestion("");
    } else {
      setOpenChapterQuestion(chapter);
    }
  };
  return (
    <div className="QuestionBank">
      <div className="levelsDivs">
        {levels.map((level) => (
          <div className="levelDiv" onClick={() => setOpenChapters(true)}>
            {level.label}
          </div>
        ))}
      </div>
      <Dialog
        maxWidth={true}
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
