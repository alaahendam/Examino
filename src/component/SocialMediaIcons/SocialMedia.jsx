import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../SocialMediaIcons/SocialMedia.css"
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram,
    faWhatsapp,
    faTelegram,
    faSnapchat,
  } from "@fortawesome/free-brands-svg-icons";
function SocialMedia(){
    return(
        <div className="social-container">

      <a href="https://www.facebook.com"
        className="facebook social">
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>
      <a href="https://www.whatsapp.com"
        className="facebook social">
        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
      </a>
      <a href="https://www.twitter.com" className="twitter social">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
      <a href="https://www.snapchat.com/" className="twitter social">
        <FontAwesomeIcon icon={faSnapchat} size="2x" />
      </a>
      <a href="https://www.instagram.com"
        className="instagram social">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
      <a href="https://www.telegram.com"
        className="instagram social">
        <FontAwesomeIcon icon={faTelegram} size="2x" />
      </a>
        </div>
    )
}
export default SocialMedia;