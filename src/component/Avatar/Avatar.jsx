import React from "react";
import Avatar from '@mui/material/Avatar';
import "../Avatar/Avatar.css"
import AvatarGroup from '@mui/material/AvatarGroup';
import image from "../../images/contact2.webp"
function Avatarr(){
    return(
       <div>
        <a href="https://twitter.com/twcloudchen" class="circle">
            <img height="128" width="128" src={image} alt="Cloud Chen" />
          </a>
          <h4>Ghanem</h4>
          <p>Level Four</p>
          <p>Computer Science</p>
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