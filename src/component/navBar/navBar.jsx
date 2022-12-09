import React, { useState } from "react";
import "./navBar.css";
import menu from "../../images/menu.png";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [openMenu, setOpenMenu] = useState(false);
  const tabs = [
    { value: "home", label: "Home" },
    { value: "About", label: "About" },
    { value: "Contact Us", label: "Contact Us" },
    { value: "SignIn", label: "Sign In" },
    { value: "signUp", label: "Sign Up" },
  ];
  const activeStyle = { fontSize: "15px", fontWeight: 600 };
  return (
    <div className="navBar">
      <div className="logo">
        <p>Examino</p>
      </div>
      <div className="info">
        {tabs.map((tab) => (
          <p
            style={tab.value == activeTab ? activeStyle : null}
            className={tab.value == "signUp" ? "signUpTab" : null}
            onClick={() => setActiveTab(tab.value)}
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
            height: "230px",
            color: "black",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "50px",
          }}
        >
          {tabs.map((tab) => (
            <p
              style={tab.value == activeTab ? activeStyle : null}
              className={tab.value == "signUp" ? "signUpTab" : null}
              onClick={() => setActiveTab(tab.value)}
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
