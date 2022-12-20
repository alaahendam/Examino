import React from "react";
import "./Certificates.css";
import image from "../../images/student.png";
import image1 from "../../images/forma.png";
import html2canvas from "html2canvas";
function Certificates(){
    const handleDownloadImage = async () => {
        const element = document.getElementById('print'),
        canvas = await html2canvas(element),
        data = canvas.toDataURL('image/jpg'),
        link = document.createElement('a');
     
        link.href = data;
        link.download = 'downloaded-image.jpg';
     
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    return(
        <div>
        <div id="print" >
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
      <img src={image1} class="certSign" alt="sign"/>
      <h3>Mohamed Adel</h3>
      <h3>Learning Lead</h3>
      <h3>math Exam</h3>
    </td>
  </tr>
</table>

        </div>
        <button type="button" onClick={handleDownloadImage}>Download</button>
        </div>
    )
}
export default Certificates;