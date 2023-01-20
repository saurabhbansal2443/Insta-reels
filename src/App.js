// after installing react-router-dom using react switch;
import './App.css';

import Feed from "./Components/Feed";
import Login from "./Components/Login";
import Forget from "./Components/Forget";
import Profile from './Components/Profile';
import PageNotFound from './Components/PageNotFound';
import Signup from './Components/Signup';
import {Switch,Route, Redirect} from "react-router-dom"; 
import { AuthContext, AuthContextProvider } from './Context/AuthContext';
import { useContext } from 'react';

function App() {

  
  return (
    <div >
 <AuthContextProvider>
    <Switch>

    <PrivateRoute path="/feed" comp={Feed}></PrivateRoute>
      {/* <Route path="/Feed">
      <Feed></Feed>
      </Route> */}
    {/* <RedirectToFeed path="/Login" comp={Login}></RedirectToFeed> */}
      <Route path="/Login">
      <Login></Login>
      </Route>

      <Route path="/Forget">
        <Forget></Forget>
      </Route>

      <PrivateRoute path="/Profile" comp={Profile}></PrivateRoute>

      {/* <Route path="/Profile">
        <Profile></Profile>
      </Route> */}

      <RedirectToFeed path="/Signup" comp={Signup}></RedirectToFeed>
      
      {/* <Route path="/Signup">
      <Signup></Signup>
      </Route> */}

      <Route >
        <PageNotFound></PageNotFound>
      </Route>
    </Switch>
    </AuthContextProvider>
    </div>
  );
}


function PrivateRoute(props){
  let Component=props.comp;
  let cuser=useContext(AuthContext);

  return(
    <Route
    {...props}
    render={
      (props)=>{
        return cuser!=null? <Component {...props}></Component>:<Redirect {...props} to="/login"></Redirect>
      }
    }

    ></Route>
  )
}


function RedirectToFeed(props){
  let Component=props.comp;
  let cuser=useContext(AuthContext);
  return(
    <Route
    {...props}
    render={
      (props)=>{
        return cuser==null?<Component {...props}></Component>:<Redirect {...props} to="/feed"></Redirect>
      }
    }
    ></Route>
  )
}

export default App;
