import React, { useState, useEffect } from "react";
import "./examStructure.css";
import { useSelector, useDispatch } from "react-redux";
import API from "../../../utilities/api";
import { toast } from "react-toastify";
const ExamInfo = ({ register, setLevel }) => {
  const login = useSelector((state) => state.login.login);
  const [levels, setLevels] = useState([]);
  const [chapters, setChapters] = useState(null);
  useEffect(() => {
    setLevels(login.ownedLevels);
    if (!login?.ownedLevels?.length) {
      toast.error("يجب اضافة بنك أسئلة اولا اضف بعض المستويات وأعد المحاولة");
    }
  }, []);

  return (
    <div className="ExamInfo ExamStructureInfo">
      <div>
        <input
          type="text"
          placeholder="Exam Name"
          {...register("examName", { required: true })}
          style={{
            paddingLeft: "10px",
          }}
        />
        <input
          type="number"
          placeholder="Duration"
          {...register("duration", { required: true })}
          style={{
            paddingLeft: "10px",
          }}
        />
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "45%" }}>
          <label
            style={{
              paddingLeft: "5px",
              marginTop: "10px",
            }}
          >
            Exam Start
          </label>
          <input
            type="datetime-local"
            {...register("startDate", { required: true })}
            style={{
              paddingLeft: "10px",
              width: "100%",
            }}
          />
        </div>
        <div style={{ marginLeft: "5px", width: "45%" }}>
          <label
            style={{
              paddingLeft: "5px",
              marginTop: "10px",
            }}
          >
            Exam End
          </label>
          <input
            type="datetime-local"
            {...register("endDate", { required: true })}
            style={{
              paddingLeft: "10px",
              width: "100%",
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label
          style={{
            paddingLeft: "5px",
            marginTop: "10px",
          }}
        >
          What level do you want to take exam ?
        </label>
        <select
          {...register("level", { required: true })}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option disabled selected value="">
            {" "}
            Select Level{" "}
          </option>
          {levels
            ? levels.map((level, index) => (
                <option value={`${JSON.stringify(level)}`} key={index}>
                  {level.name}
                </option>
              ))
            : null}
        </select>
      </div>
    </div>
  );
};
export default ExamInfo;
