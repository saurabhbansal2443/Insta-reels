
import "./profile.css";
import React,{useContext, useEffect,useState} from "react";
import {AuthContext} from "../Context/AuthContext"
import { doc,getDoc } from "firebase/firestore";
import {db } from "../Firebase";


function Profile(){

    let cuser=useContext(AuthContext);
    let [loading , setLoading]=useState(true);
    let [user,setUser]=useState(null);


    useEffect(function fn(){
        (async function(){
            //read from databse
                if(cuser){
                    
            const docref=doc(db,"users",cuser.uid);
            const userObj=await getDoc(docref);
            console.log(userObj.data());
            setUser(userObj.data());
            setLoading(false);
        }
        
        })()

    },[])


    return(
        <>
            {
                loading==true?<h1>...loading</h1>:

            
        
        <div>
        <div className="header"></div>
            <div className="main">
                <div className="pimg_container">
                    <img className="pimg" src="https://1.bp.blogspot.com/-0ZUMPsBahSo/X0vuBttwtWI/AAAAAAAAdwM/_0Nuxi-PWUsgTsLdAmGZqILPiJf7N2bdACLcBGAsYHQ/w320-h640/best%2Bdp%2Bfor%2Bwhatsapp%2B%25281%2529.jpg" alt=""></img>
                </div>
                <div className="deatils">
                    <div className="content">{user.name}</div>
                    <div className="content">No. of Post <span className="bold_text">{user.reelsIds.length}</span></div>
                    <div className="content">{user.mail} <span className="bold_text">Email</span></div>
                </div>
            </div>
        </div>}
          </>
    )
}

export default Profile;