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
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import HowToRegSharpIcon from "@mui/icons-material/HowToRegSharp";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import Swal from "sweetalert2";
import MainButton from "../../component/button/button";
const QuestionBankChapters = () => {
  const login = useSelector((state) => state.login.login);
  let { levelName } = useParams();
  const [chapters, setChapters] = useState(null);
  const [chapterName, setChapterName] = useState("");
  const [chapterQuestions, setChapterQuestions] = useState(null);

  const [loading, setLoading] = useState(false);

  const [openChapterQuestion, setOpenChapterQuestion] = useState(null);
  const [editQuestion, setEditQuestion] = useState(false);
  const [editData, setEditData] = useState(null);
  const [openStudents, setOpenStudents] = useState(false);
  const [students, setStudents] = useState(null);
  const [openAddChapter, setOpenAddChapter] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let { data } = await API.post("/level/levelInfo", {
          ownerId: login.id,
          levelName: levelName,
        });
        setChapters(data[0]);
        setLoading(false);
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
  const addChapter = async (e) => {
    e.preventDefault();
    try {
      let { data } = await API.post("/chapter/create", {
        name: chapterName,
        levelId: chapters.id,
      });
      setOpenAddChapter(false);
      setChapters({ ...chapters, chapters: [...chapters?.chapters, data] });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Chapter Added",
        showConfirmButton: false,
        timer: 1500,
      });
      // toast.success("تم الإضافة بنجاح");
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ما يرجي اعادة المحاولة ");
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
    try {
      let { data } = await API.post("/question/create", {
        chapterId: openChapterQuestion,
        difficulty: questions.difficulty,
        type: questions.questionType,
        details: questions,
      });

      toast.success("تم إضافة سؤال بنجاح");
      setChapterQuestions([
        ...chapterQuestions,
        {
          ...data.details,
          difficulty: data.difficulty,
          questionType: data.type,
          id: data.id,
        },
      ]);
    } catch (error) {}
  };
  const handelEditData = (data) => {
    setEditQuestion(!editQuestion);
    setEditData(data);
  };
  const handelEditOldQuestion = async (questions) => {
    try {
      let { data } = await API.put("/question/edit", {
        id: editData.id,
        difficulty: questions.difficulty,
        type: questions.questionType,
        details: questions,
      });
      let tempEditData = {
        ...data.details,
        difficulty: data.difficulty,
        questionType: data.type,
        id: data.id,
      };
      let tempEditArray = [];
      chapterQuestions.map((item, index) => {
        if (item.id == tempEditData.id) {
          tempEditArray.push(tempEditData);
        } else {
          tempEditArray.push(item);
        }
      });
      setChapterQuestions(tempEditArray);
      toast.success("تم التعديل بنجاح");
    } catch (error) {
      console.log(error);
    }
  };
  const handelDeleteQuestion = async (id) => {
    try {
      let { data } = await API.delete(`/question/deleteQuestion/${id}`);
      let tempDeleteArray = chapterQuestions.filter((item) => {
        return item.id != id;
      });
      setChapterQuestions(tempDeleteArray);
      toast.success("تم حذف السؤال بنجاح");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchStudentData = async () => {
    try {
      let id;
      login.ownedLevels.map((level) => {
        if (level.name == levelName) {
          id = level.id;
        }
      });
      setLoading(true);
      let { data } = await API.get(`/level/getLevelStudents/${id}`);

      setStudents(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (openStudents) {
      fetchStudentData();
    }
  }, [openStudents]);
  const handelOwnerApprove = async (levelOnStudent) => {
    try {
      let { data } = await API.post(`/level/ownerApproved`, {
        userId: levelOnStudent.userId,
        levelId: levelOnStudent.levelId,
      });
      fetchStudentData();
      // let tempArray = [];
      // students.map((student) => {
      //   if (levelOnStudent.userId == student.userId) {
      //     tempArray.push({ ...student, ownerApproved: true });
      //   } else {
      //     tempArray.push(student);
      //   }
      // });
      // setStudents(tempArray);
    } catch (error) {
      console.log(error);
    }
  };
  const handelDeleteStudent = async (student) => {
    try {
      const { data } = await API.post("level/deleteStudent", student);
    } catch (error) {
      console.log(error);
      toast.error("هناك خطأ قد حدث");
    }
  };
  return (
    <div
      style={{
        height: "88vh",
      }}
    >
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "20px",
        }}
      >
        <MainButton
          text="Add Chapter"
          onClick={() => setOpenAddChapter(true)}
        />

        <MainButton text="Students" onClick={() => setOpenStudents(true)} />
      </div>
      {loading ? (
        <>
          <br />
          <br />
          <Box style={{ textAlign: "center", margin: "auto" }}>
            <CircularProgress />
          </Box>
        </>
      ) : chapters && chapters.chapters ? (
        chapters?.chapters?.map((chapter, index) => (
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
                ? chapterQuestions?.map((question, index) => (
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
                        <p>{`pointes : ( ${question.pointes} )`}</p>
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
                            onClick={() => handelDeleteQuestion(question.id)}
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
                        {question?.numberOfAnswer.map((answer, index) => (
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
      ) : null}

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
      <Dialog
        maxWidth={"lg"}
        fullWidth={true}
        open={openStudents ? true : false}
        onClose={() => setOpenStudents(false)}
      >
        <div
          style={{
            height: "700px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "15px",
          }}
        >
          <MainButton
            style={{
              background: "red",
            }}
            onClick={() => handelDeleteStudent({ levelId: chapters.id })}
            text="Delete All Students"
          />

          {loading ? (
            <>
              <br />
              <br />
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </>
          ) : students ? (
            students.map((student) => (
              <div className="levelInfo">
                <div className="levelDetails">
                  <p>Name: {student.user.name}</p>
                  <p>Telephone: {student.user.telephone}</p>
                  <p>Job: {student.user.role}</p>
                </div>
                <div className="studentApproved">
                  {student.ownerApproved ? (
                    <FcApproval
                      style={{
                        fontSize: "25px",
                        color: "#9e17d3",
                      }}
                    />
                  ) : (
                    <HowToRegSharpIcon
                      style={{
                        fontSize: "30px",
                        color: "#9e17d3",
                        cursor: "pointer",
                      }}
                      onClick={() => handelOwnerApprove(student)}
                    />
                  )}
                  <AiOutlineDelete
                    style={{
                      fontSize: "24px",
                      color: "red",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handelDeleteStudent({
                        userId: student.userId,
                        levelId: student.levelId,
                      })
                    }
                  />
                </div>
              </div>
            ))
          ) : null}
        </div>
      </Dialog>
      <Dialog
        maxWidth={"lg"}
        fullWidth={true}
        open={openAddChapter ? true : false}
        onClose={() => setOpenAddChapter(false)}
      >
        <form className="chapterFrom" onSubmit={addChapter}>
          <label>Add A New Chapter</label>
          <input
            style={{ marginLeft: "0.5rem", padding: "13px" }}
            required
            type="text"
            placeholder="Set Chapter Name"
            onChange={(e) => setChapterName(e.target.value)}
          />

          <MainButton
            type={"submit"}
            text="Add Chapter"
            style={{ marginLeft: "0.5rem" }}
          />
        </form>
      </Dialog>
    </div>
  );
};
export default QuestionBankChapters;
