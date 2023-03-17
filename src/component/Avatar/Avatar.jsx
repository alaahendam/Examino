import React from "react";
import Avatar from '@mui/material/Avatar';
import "../Avatar/Avatar.css"
import AvatarGroup from '@mui/material/AvatarGroup';
import image from "../../images/onlinecall.webp"
import avatar1 from "../../images/avatar1.jpg";
import avatar2 from "../../images/avatar2.jpg";
function Avatarr(){
    return(
       <div>
     <AvatarGroup max={2} style={{justifyContent:"center",paddingTop:"15px"}}>
      <Avatar alt="Travis Howard" src={avatar2} />
      <Avatar alt="Remy Sharp" src={avatar1} />
    </AvatarGroup>
    <br/>
         <h4>
          Alaa Hendam & Mohamed Adel
         </h4>
         <br/>
          <p className="para1">
          With an online exam, there is no need to manually grade each answer sheet,
           as the results are automatically calculated by the computer.
            This not only saves time, but also reduces the risk of human error.
          An online exam provides flexibility and security to the examination process.
           Once all the questions are uploaded in the system,
            the system can shuffle and give questions in different orders to different students.
             This minimizes the chance of cheating.
        <span>,,</span>
    </p>
    <br/>
       </div>
    )
}
export default Avatarr;