//https://firebase.google.com/docs/auth/web/password-auth   (firebase documnetation)
// https://console.firebase.google.com/project/fir-demo-d2559/authentication/users   (firebase user informations )
import { useEffect, useState } from "react";
import {auth } from "../Firebase";


import {signInWithEmailAndPassword,signOut ,onAuthStateChanged} from "firebase/auth";


function Login(){
    let [mail,setMail]=useState("");
    let [password,setPassword]=useState("");
    let [loader,setLoader]=useState(false);
    let [user,setUser]=useState("");
    let [error,seterror]=useState(null);
   

    let trackMail=function(e){
        setMail(e.target.value);    
    }

    let trackPassword=function(e){
        setPassword(e.target.value);
    }

    let printDetails=async function(e){
        

        try{

        setLoader(true);
        let userCred= await signInWithEmailAndPassword(auth, mail, password);
        setUser(userCred.user);
            console.log(userCred.user);
        }catch(error){
          seterror(error.message);
          setTimeout(()=>{
            seterror(null);
          },2000);

        }
       setLoader(false);


    }

    let logout=async function(){

        signOut(auth);
        setUser("");
    }
//checking of user is logged in or not
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
             setUser(user); 
            } else {
             setUser("");
            }
          
          })
        
    },[])



    return(
        <div>
        {  
            error!=null?<h1>{error}</h1>:
           
            loader!=false?<h1>...loading pls wait</h1>:
            user!=""?<><h1>{user.uid}</h1><button onClick={logout}>log out </button></>:
        <div> 
         <input type="mail" placeholder="E-Mail" onChange={trackMail}></input>
        <br></br>
        <input type="password" placeholder="Password" onChange={trackPassword}></input>
        <br></br>
        <button  onClick={printDetails}>Login</button>
        </div>
        }
        </div>
    )
}


export default Login