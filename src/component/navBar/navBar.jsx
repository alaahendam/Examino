import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./navBar.css";
import menu from "../../images/menu.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";

import { addLogin, deleteLogin } from "../../redux/features/loginSlice";
import Student from "../../images/student.png";
import Teacher from "../../images/teacher.png";
const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);
  const login = useSelector((state) => state.login.login);
  const [activeTab, setActiveTab] = useState("home");

  const [openMenu, setOpenMenu] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  var tabs = [
    { value: "/", label: "Home" },
    { value: "/about", label: "About" },
    { value: "/contactUs", label: "Contact Us" },
    ,
  ];
  if (login && login.role == "Teacher") {
    tabs.push({ value: "/questionBank", label: "Question Bank" });
    tabs.push({ value: "/exams", label: "Exams" });
  } else if (login && login.role == "Student") {
    tabs.push({ value: "/exams", label: "Exams" });
    tabs.push({ value: "/scores", label: "Scores" });
    tabs.push({ value: "/certificate", label: "Certificate" });
  } else {
    tabs.push({ value: "/signIn", label: "Sign In" });
    tabs.push({ value: "/signUp", label: "Sign Up" });
  }
  const activeStyle = { fontSize: "15px", fontWeight: 600 };
  const handelNavigate = (value) => {
    navigate(value);
    setOpenMenu(false);
  };
  const handelLogout = () => {
    dispatch(addLogin(null));
    window.localStorage.clear();
  };
  return (
    <div className="navBar">
      <div className="logo">
        <p onClick={() => navigate("/")}>Examino</p>
      </div>
      <div className="info">
        {tabs.map((tab, index) => (
          <p
            style={tab.value == activeTab ? activeStyle : null}
            className={tab.value == "signUp" ? "signUpTab" : null}
            onClick={() => handelNavigate(tab.value)}
            key={index}
          >
            {tab.label}
          </p>
        ))}
        {login ? (
          <div
            style={{
              backgroundColor: "rgb(201 201 16)",
              borderRadius: "50%",
            }}
            onClick={() => setOpenLogout(!openLogout)}
          >
            <img
              src={login.role == "Teacher" ? Teacher : Student}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
            {openLogout ? (
              <div
                style={{
                  backgroundColor: "#ddd6d6",
                  width: "130px",
                  height: "40px",
                  position: "absolute",
                  top: "50px",
                  right: "5px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  cursor: "pointer",
                  zIndex: 11,
                }}
                onClick={handelLogout}
              >
                Logout
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="menuToggler">
        <GiHamburgerMenu
          onClick={() => setOpenMenu(!openMenu)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div
        style={{
          width: "0%",
          position: "fixed",
          backgroundColor: "white",
          right: "0px",
          bottom: "0px",
          top: "0px",
          width: openMenu ? "50%" : "0%",
          transition: "width 0.3s",
        }}
      >
        <div
          style={{
            display: openMenu ? "flex" : "none",
            width: "100%",
            height: "80vh",
            color: "black",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "50px",
          }}
        >
          {tabs.map((tab, index) => (
            <p
              style={tab.value == activeTab ? { ...activeStyle } : null}
              className={tab.value == "signUp" ? "signUpTab" : null}
              onClick={() => handelNavigate(tab.value)}
              key={index}
            >
              {tab.label}
            </p>
          ))}
          {login ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={login.role == "Teacher" ? Teacher : Student}
                style={{
                  backgroundColor: "rgb(203 203 19)",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={() => setOpenLogout(!openLogout)}
              />
              {openLogout ? (
                <div
                  style={{
                    backgroundColor: "#ddd6d6",
                    width: "130px",
                    height: "40px",
                    position: "absolute",
                    bottom: "50px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                  onClick={handelLogout}
                >
                  Logout
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <div
        style={{
          width: "0%",
          position: "fixed",
          backgroundColor: "rgb(0,0,0,0.2)",
          left: "0px",
          bottom: "0px",
          top: "0px",
          width: openMenu ? "50%" : "0%",
          transition: "width 0.3s",
        }}
        onClick={() => setOpenMenu(!openMenu)}
      ></div>
    </div>
  );
};
export default NavBar;
