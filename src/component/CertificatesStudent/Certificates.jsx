import React from "react";
import "./Certificates.css";
import image from "../../images/student.png"
function Certificates(){
    return(
        <div>
            {/* <link href="https://fonts.googleapis.com/css?family=Satisfy" rel="stylesheet"> */}

<table class="cert">
  <tr>
    <td align="center" class="crt_logo">
      <img style={{width:"150px"}} src={image} alt="logo" />

    </td>
  </tr>
  <tr>
    <td align="center">
      <h1 class="crt_title">Certificate Of Completion </h1>
        <h2>This Certificate is awarded to</h2>
        <h1 class="colorGreen crt_user">Mohamed Adel</h1>
        <h3 class="afterName">For his/her completion for high degree from Examino
        </h3>
        <h3>Awarded on 1 March 2020 </h3>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://camo.githubusercontent.com/805e05b94844e39d7edd518f492c8599c71835b3/687474703a2f2f692e696d6775722e636f6d2f646e5873344e442e706e67" class="certSign" alt="sign"/>
      <h3>Mohamed Adel</h3>
      <h3>Learning Lead</h3>
      <h3>math Exam</h3>
    </td>
  </tr>
</table>
        </div>
    )
}
export default Certificates;