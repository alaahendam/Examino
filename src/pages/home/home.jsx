import React from "react";
import "./home.css";
import WhatSay from "../../component/cart";
import home from "../../images/home.jpg";
import Sliderr from "../../component/Sliderr/Sliderr";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="home">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            direction: "rtl",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={home} alt="" />
          <div className="getStartedInfo">
            <p
              style={{
                fontSize: "20px",
                fontWeight: 600,
                marginBottom: "10px",
              }}
            >
              Online Exam Builder
            </p>
            <p
              style={{
                fontSize: "14px",
                marginBottom: "14px",
              }}
            >
              it is a online exam website that aims to help university students
              to perform their exams easily and helps professors to set the exam
              easily
            </p>
            <button
              className="getStartedBtn"
              onClick={() => navigate("/signIn")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "3.6em" }}>
        <Sliderr />
      </div>
    </div>
  );
};
export default Home;
