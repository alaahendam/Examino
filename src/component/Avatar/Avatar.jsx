import React from "react";
import Avatar from '@mui/material/Avatar';
import "../Avatar/Avatar.css"
import AvatarGroup from '@mui/material/AvatarGroup';
import image from "../../images/onlinecall.webp"
function Avatarr(){
    return(
       <div>
     <AvatarGroup max={2} style={{justifyContent:"center",paddingTop:"15px"}}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
    </AvatarGroup>
    <br/>
         <h4>
          Mohamed Adel & Alaa Hendam
         </h4>
         <br/>
          <p className="para1">
          
        GeeksforGeeks is my favourite site where 
        I can gain a lot of knowledge and can 
        also share my knowledge what i have 
        gained while learning. We can add more 
        paragraphs for content. This is just an 
        example to tell how to create a story 
        book like effect. More paragraphs, 
        content just for showing its best effect. 
        <span>,,</span>
    </p>
    <br/>
       </div>
    )
}
export default Avatarr;