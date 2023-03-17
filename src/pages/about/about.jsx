import React from "react";
import "./about.css";
import Aboutdiv1 from "../../component/Aboutdiv1";
import img from "../../images/about1.webp";
import img2 from "../../images/about2.webp";
import Avatarr from "../../component/Avatar/Avatar";
const About = () => {
  return(
    <div className="About">
      <div className="child-about about1">
        <div className="about11">
          <Aboutdiv1 />
        </div>
        <div className="about12" style={{textAlign:"right"}}>
          <img className="testimage" src={img}></img>
        </div>
        </div>
      <div className="child-about about2">
        <div className="about21">
        <img className="whyImage" src={img2} style={{height:"320px",width:"70%"}}></img>
        </div>
        <div className="about22">
          <h3>Why Choose Us !? </h3>
          <br/>
          <div className="whyPargraph" style={{textAlign:"left"}}>
             <ol>
             <li>Multiple choices, multiple answers, Fill in the blanks, True & False, Essay, Match the Matrix, Match the following, and much more</li>
                <li>The software automatically picks random questions for different users to avoid cheating and duplication of questions.</li>
                <li>Our software is 110% fully customizable. You can give us the changes and your requirements anytime with free software demo.</li>
            </ol>
          </div>
        </div>
      </div>
      <div className="child-about about3">
        <h3> We Bult Our Trust With Our<br/> Proffesors & Students</h3>
        <br/><br/>
        <div className="aboutAvatar">
           <Avatarr />
        </div>
      </div>
      <br/>
    </div>
  )
};
export default About;
