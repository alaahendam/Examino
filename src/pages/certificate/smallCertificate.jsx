import React from "react";
import "./smallCertificate.css";
import image from "../../images/student.png";
import image1 from "../../images/forma.png";
import html2canvas from "html2canvas";
import { useSelector, useDispatch } from "react-redux";
const SmallCertificate = ({ examInfo }) => {
  const login = useSelector((state) => state.login.login);
  const handleDownloadImage = async () => {
    const element = document.getElementById("print"),
      canvas = await html2canvas(element),
      data = canvas.toDataURL("image/jpg"),
      link = document.createElement("a");

    link.href = data;
    link.download = "downloaded-image.jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="smallCertificate">
      <div id="print">
        {/* <link href="https://fonts.googleapis.com/css?family=Satisfy" rel="stylesheet"> */}

        <table class="cert">
          <tr>
            <td align="center" class="crt_logo">
              <img src={image} alt="logo" />
            </td>
          </tr>
          <tr>
            <td align="center">
              <h1 class="crt_title">Certificate Of Completion </h1>
              <h2>This Certificate is awarded to</h2>
              <h1 class="colorGreen crt_user">{login.name}</h1>
              <h3 class="afterName">
                For his/her completion for {examInfo.grade}% degree from Examino
              </h3>
              <h3>Awarded on {examInfo.endAt.split("T")[0]} </h3>
            </td>
          </tr>
          <tr>
            <td align="center">
              <img src={image1} class="certSign" alt="sign" />
              <h3>{examInfo.teacherName}</h3>
              <h3>Learning Lead</h3>
              <h3>{examInfo.examName}</h3>
            </td>
          </tr>
        </table>
      </div>
      <button type="button" onClick={handleDownloadImage}>
        Download
      </button>
    </div>
  );
};
export default SmallCertificate;
