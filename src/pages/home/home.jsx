import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div
      style={{
        backgroundColor: "#E7EBF0",
        width: "100%",
        height: "88vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="home"
    >
      <a href="https://www.behance.net/gallery/126118663/Online-Exam-Case-Study">
        Ui & Ux Case Study
      </a>
      <a href="https://www.behance.net/gallery/126118663/Online-Exam-Case-Study">
        Github Repo
      </a>
    </div>
  );
};
export default Home;
