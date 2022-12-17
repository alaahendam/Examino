import React from "react";
import "../contactUs/contactUs.css";
import SocialMedia from "../../component/SocialMediaIcons/SocialMedia";
import img from "../../images/onlinecall.webp";
import ContactForm from "../../component/ContactForm/Contactform";
//addImage
function ContactUs(){
  return(
  <div style={{marginTop:"50px"}}>
       <br /><br />
       <div className="text">
           <h2>Contact Us !</h2>
           <p style={{marginTop:"15px"}}>Feel Free To Contact Us Any Time </p>
       </div>
       <div className="root">
          <div className="grid-element div1"><ContactForm/></div>
          <div className="grid-element div2">
            <img className="image" src={img} style={{height:"80%",width:"100%"}}></img>
          </div>
          <div className="grid-element div3"><SocialMedia/></div>
          <br/>
       </div>
  </div>
  )
}
export default ContactUs;
