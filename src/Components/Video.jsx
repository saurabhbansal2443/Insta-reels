import React,{useState} from "react";

function Video(props){
  console.log(props.data.Url);
    let [playing ,setPlaying]=useState(true);
    let [commentBox,setCommentBox]=useState("false");

    let handlePlay=(e)=>{
      if(playing){
        e.currentTarget.pause();
        setPlaying(false);
      }else{
        e.currentTarget.play();
        setPlaying(true); 
      }
    }

    let handleCommentBox=()=>{
       let val=commentBox;
       setCommentBox(!val);
    }

    return(
        <>
       
       

        <span onClick={handleCommentBox}>comments</span>

        {
          commentBox===true?<h1>user and commnets
          <input></input> 
          <button>post</button>
          </h1>:<h1></h1>
        }
       
            <video onClick={handlePlay}  width="700" height="700" autoplay loop>
            <source src={props.data.Url} type="video/mp4"/>
            </video>
        </>
    )
}

export default Video;
