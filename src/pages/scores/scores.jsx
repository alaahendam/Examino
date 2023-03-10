import React, { useState, useEffect } from "react";
import "./scores.css";
import API from "../../utilities/api";
import { useSelector, useDispatch } from "react-redux";
import { RiUserFollowFill } from "react-icons/ri";
import { FcApproval } from "react-icons/fc";
import waitingList from "../../images/waitingList.png";
const Scores = () => {
  const [searchInput, setSearchInput] = useState("");
  const [level, setLevel] = useState(null);
  const [approvalData, setApprovalData] = useState(null);
  const login = useSelector((state) => state.login.login);
  const getData = async (e) => {
    e.preventDefault();
    console.log(searchInput);
    try {
      let { data } = await API.post("/level/getLevel", {
        specialCode: searchInput,
      });
      setLevel(data);
    } catch (error) {
      console.log(error);
      setLevel(null);
    }
  };
  const addLevelOnUser = async () => {
    try {
      let { data } = await API.post("/level/addLevelOnUser", {
        userId: login.id,
        levelId: level.id,
      });
      setApprovalData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data } = await API.post("/level/checkStudentApproved", {
          userId: login.id,
          levelId: level.id,
        });
        setApprovalData(data);
      } catch (error) {
        console.log(error);
        setApprovalData(null);
      }
    };
    if (level) {
      fetchData();
    }
  }, [level]);
  return (
    <div className="scores">
      <form onSubmit={getData}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search By Level Code"
          style={{
            paddingLeft: "10px",
          }}
        />
        <input type="submit" value={"Search"} />
      </form>

      {level ? (
        <div className="levelInfo">
          <div className="levelDetails">
            <p>level Name: {level.name}</p>
            <p>Teacher Name : {level.owner.name}</p>
            <p>Email: {level.owner.email}</p>
          </div>
          <div className="studentApproved">
            {approvalData ? (
              approvalData.ownerApproved ? (
                <FcApproval
                  style={{
                    fontSize: "25px",
                    color: "#9e17d3",
                  }}
                />
              ) : (
                <img src={waitingList} alt="" srcset="" />
              )
            ) : (
              <RiUserFollowFill
                onClick={addLevelOnUser}
                style={{
                  fontSize: "25px",
                  color: "#9e17d3",
                  cursor: "pointer",
                }}
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Scores;
