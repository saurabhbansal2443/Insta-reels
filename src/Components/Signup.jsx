import React ,{useState}from "react";
import { setDoc, doc } from "firebase/firestore";
import {createUserWithEmailAndPassword ,} from "firebase/auth"
import {auth,db} from "../Firebase"

function Signup(){

    let [mail,setMail]=useState("");
    let [password,setPassword]=useState("");
    let [name,setName]=useState("");
    let [loader,setLoader]=useState(false);
    let [error,setError]=useState("");
    let [user, setUser]=useState("");

    let SignUpProcess=async function(){
        try{
            setLoader(true);
            let userCred =await createUserWithEmailAndPassword(auth, mail, password);
             await setDoc(doc(db, "users",userCred.user.uid), {
                mail,
                name,
                reelsIds:[],
                profileImg:"",
                userId:userCred.user.uid

              });

           setUser(userCred.user);
        }catch(err){
            setError(err.message);
            setTimeout(()=>{
                setError("");
            },2000);
        }

        setLoader(false);
      
    }

    return(
        <>
        {
            error!=""?<h1>{error}</h1>:
            user!=""?<h1>Sign up user{user.uid}</h1>:
            loader!=false?<h1>...loading</h1>:
        <div> 
        <input type="mail" placeholder="E-Mail" value={mail}  onChange={(e)=>{setMail(e.target.value)}}></input>
       <br></br>
       <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
       <br></br>
       <input type="name" placeholder="Full-Name" value={name}  onChange={(e)=>{setName(e.target.value)}}></input>
       <br></br>
       <button type="signup" onClick={SignUpProcess} >Sign-up</button>
       </div>
        }
       </>
    )
}

export default Signup