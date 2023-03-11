import React, { useState, useEffect } from "react";
import "./memberships.css";
import API from "../../utilities/api";
import { useSelector, useDispatch } from "react-redux";
import { RiUserFollowFill } from "react-icons/ri";
import { FcApproval } from "react-icons/fc";
import waitingList from "../../images/waitingList.png";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const Memberships = () => {
  const [searchInput, setSearchInput] = useState("");
  const [level, setLevel] = useState(null);
  const [approvalData, setApprovalData] = useState(null);
  const [studentMemberships, setStudentMemberships] = useState(null);

  const [loading, setLoading] = useState(false);

  const login = useSelector((state) => state.login.login);
  const getData = async (e) => {
    try {
      let { data } = await API.post("/level/getLevel", {
        specialCode: e.target.value,
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
  useEffect(() => {
    try {
      const levelOnUser = async () => {
        setLoading(true);
        const { data } = await API.get(`/level/studentMemberships/${login.id}`);
        console.log(data);
        setStudentMemberships(data);
        setLoading(false);
      };
      levelOnUser();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="scores">
      <input
        type="text"
        onChange={getData}
        placeholder="Search By Level Code"
        style={{
          paddingLeft: "10px",
        }}
      />

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
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="studentMemberships">
          {studentMemberships?.map((membership, index) => (
            <div
              className="levelInfo"
              style={{
                width: "100%",
                background:
                  "linear-gradient(70deg, rgb(219 167 239), rgb(113 233 236))",
                color: "white",
              }}
            >
              <div className="levelDetails">
                <p>level Name: {membership.level.name}</p>
                <p>Teacher Name : {membership.level.owner.name}</p>
                <p>Email: {membership.level.owner.email}</p>
              </div>
              <div className="studentApproved">
                {membership.ownerApproved ? (
                  <FcApproval
                    style={{
                      fontSize: "25px",
                      color: "#9e17d3",
                    }}
                  />
                ) : (
                  <img src={waitingList} alt="" srcset="" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Memberships;
