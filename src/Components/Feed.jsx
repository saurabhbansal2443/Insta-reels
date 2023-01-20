import "./feed.css";
import { auth } from "../Firebase";
import React, { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import Video from "./Video";
import { storage } from "../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";
import { AuthContext } from "../Context/AuthContext";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

function Feed() {
  let cuser = useContext(AuthContext);

  let [posts, setPosts] = useState([]);

  useEffect(async () => {
    let arr=[];
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
      arr.push({id:doc.id,...doc.data()})
    });
    setPosts(arr);
    
  }, []);

  let handleInputFile = (e) => {
    let videObj = e.target.files[0];
    let { name, type, size } = videObj;
    type = type.split("/")[0];
    if (type != "video") {
      alert("pls uplaod a video file ");
    } else {
      let storageRef = ref(storage, `/posts/${name}`);
      let uploadTask = uploadBytesResumable(storageRef, videObj);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);

            console.log(cuser);
            await setDoc(doc(db, "posts", cuser.uid + `${name}`), {
              mail: cuser.email,

              Url: downloadURL,
              comments: [],
              likes: [],
            });
          });
        }
      );
    }
  };

  return (
    <div>
      <div className="header">
        <img
          className="instaLogo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
        ></img>
        <img
          className="Profile_img"
          src="https://1.bp.blogspot.com/-0ZUMPsBahSo/X0vuBttwtWI/AAAAAAAAdwM/_0Nuxi-PWUsgTsLdAmGZqILPiJf7N2bdACLcBGAsYHQ/w320-h640/best%2Bdp%2Bfor%2Bwhatsapp%2B%25281%2529.jpg"
        ></img>
      </div>
      <button
        onClick={() => {
          signOut(auth);
        }}
      >
        Log-out
      </button>
      <div className="main_container">
        <button className="upload">Upload</button>
        <div className="Reels_container">Reels</div>
      </div>
      <input type="file" onChange={(e) => handleInputFile(e)}></input>

      {posts.map((post) => {
        return <Video key={post.id} data={post}></Video>;
      })}
    </div>
  );
}

export default Feed;
