import React from "react";
import "./contactUs.css";
import ContactForm from "../../component/ContactForm/Contactform";
import "bootstrap/dist/css/bootstrap.min.css";
import img from "../../images/contact2.webp";
const ContactUs = () => {
  return (
    <div>
      <div className="contactText">
        <h2>Contact Us !</h2>
        <p className="pText">Feel Free to Contact us anytime</p>
      </div>
      <br />
      <br />
      <br />
      <div className="gridDiv">
        <div className="div1">
          <ContactForm />
        </div>
        <div className="div2">
          <img className="img1" src={img} style={{ width: "500px" }}></img>
        </div>
        <div className="div3">facebook</div>
      </div>
    </div>
  );
};
export default ContactUs;
