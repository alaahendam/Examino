import React from "react";
import "./button.css";

const MainButton = ({ type, text, onClick, style }) => {
  return (
    <input
      type={type ? type : "button"}
      value={text}
      className="mainBtn"
      onClick={onClick ? onClick : null}
      style={style}
    />
  );
};
export default MainButton;
