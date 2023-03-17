import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./questionBank.css";
import Dialog from "@mui/material/Dialog";
import API from "../../utilities/api";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import MainButton from "../../component/button/button";
import Swal from "sweetalert2";
const QuestionBank = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const login = useSelector((state) => state.login.login);
  const [openChapters, setOpenChapters] = useState(false);
  const [chapterInfo, setChapterInfo] = useState([]);

  const [newLevel, setNewLevel] = useState(false);
  const [openChapterQuestion, setOpenChapterQuestion] = useState(null);
  const [levels, setLevels] = useState([]);
  const [editQuestion, setEditQuestion] = useState(false);
  const [editData, setEditData] = useState(null);
  const [questionEditIndex, setQuestionEditIndex] = useState(null);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     let { data } = await API.post("/level/getOwnerLevels", {
    //       id: login.id,
    //     });
    //     console.log(data);
    //     setLevels(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchData();
    setLevels(login.ownedLevels);
  }, []);
  console.log(login);
  // useEffect(() => {
  //   if (
  //     levels[openChapters.levelIndex] &&
  //     levels[openChapters.levelIndex].chapters[openChapterQuestion]
  //   ) {
  //     setChapterInfo(
  //       levels[openChapters.levelIndex].chapters[openChapterQuestion].question
  //     );
  //   }
  // }, [chapterInfo]);

  const handelAddNewLevel = async (values) => {
    try {
      let { data } = await API.post("/level/create", {
        ...values,
        ownerId: login.id,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Level Added",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(data);
      setLevels([...levels, values]);
      setNewLevel(false);
    } catch (error) {
      console.log(error);
      toast.error("كود المستوي موجود بالفعل");
    }
  };

  // Dont Forget Veno Partner .....
  // console.log(levels);
  return (
    <div className="QuestionBank">
      <div>
        <MainButton text="Add A New Level" onClick={() => setNewLevel(true)} />
      </div>
      <div className="levelsDivs">
        {levels?.map((level, index) => (
          <div
            className="levelDiv"
            // onClick={() =>
            //   setOpenChapters({
            //     levelIndex: index,
            //     openChapterDialog: true,
            //   })
            // }
            onClick={() => navigate(`${level.name}`)}
            key={index}
          >
            {level.name}
          </div>
        ))}
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
          onSubmit={handleSubmit(handelAddNewLevel)}
        >
          <p>Add A New Level !</p>
          <input
            type="text"
            placeholder="Pleace Set Level Name"
            {...register("name", { required: true })}
          />
          <input
            type="text"
            placeholder="Pleace Set Special Code For This Level"
            {...register("specialCode", { required: true })}
          />
          <MainButton type={"submit"} text="Add Level" />
        </form>
      </Dialog>
      {/* <Dialog
        fullScreen
        maxWidth={"md"}
        fullWidth={true}
        open={openChapters ? true : false}
        onClose={() => setOpenChapters(false)}
      >
        
      </Dialog>
      <Dialog
        maxWidth={"md"}
        fullWidth={true}
        open={editQuestion ? true : false}
        onClose={() => setEditQuestion(false)}
      >
        <QuestionMaker editFlag={true} editData={editData} />
      </Dialog> */}
    </div>
  );
};
export default QuestionBank;
