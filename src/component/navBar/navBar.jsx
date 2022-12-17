import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navBar.css";
import menu from "../../images/menu.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
const NavBar = () => {
  const navigate = useNavigate();
  const login = useSelector((state) => state.login.login);
  const [activeTab, setActiveTab] = useState("home");
  const [openMenu, setOpenMenu] = useState(false);
  var tabs = [
    { value: "/", label: "Home" },
    { value: "about", label: "About" },
    { value: "contactUs", label: "Contact Us" },
    ,
  ];
  if (login && login.role == "Teacher") {
    tabs.push({ value: "questionBank", label: "Question Bank" });
    tabs.push({ value: "exams", label: "Exams" });
    tabs.push({ value: "certificate", label: "Certificate" });
  } else if (login && login.role == "Student") {
    tabs.push({ value: "exams", label: "Exams" });
    tabs.push({ value: "scores", label: "Scores" });
  } else {
    tabs.push({ value: "signIn", label: "Sign In" });
    tabs.push({ value: "signUp", label: "Sign Up" });
  }
  const activeStyle = { fontSize: "15px", fontWeight: 600 };
  const handelNavigate = (value) => {
    setActiveTab(value);
    navigate(value);
    setOpenMenu(false);
  };

  return (
    <div className="navBar">
      <div className="logo">
        <p onClick={() => navigate("/")}>Examino</p>
      </div>
      <div className="info">
        {tabs.map((tab) => (
          <p
            style={tab.value == activeTab ? activeStyle : null}
            className={tab.value == "signUp" ? "signUpTab" : null}
            onClick={() => handelNavigate(tab.value)}
          >
            {tab.label}
          </p>
        ))}
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
          {tabs.map((tab) => (
            <p
              style={tab.value == activeTab ? { ...activeStyle } : null}
              className={tab.value == "signUp" ? "signUpTab" : null}
              onClick={() => handelNavigate(tab.value)}
            >
              {tab.label}
            </p>
          ))}
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
