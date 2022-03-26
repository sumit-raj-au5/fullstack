import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//Importing components
import Header from "./components/Header/Header";
import Question from "./components/Add-Question/Question";
import ViewQuestion from './components/ViewQuestion'
import Auth from './components/Auth'
import StackOverflow  from "./components/StackOverflow";
import {login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import "./App.css";

// Implementing React router dom
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";




function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          displayName: authUser.displayName,
          email: authUser.email
        }))
      }
      else{
        dispatch(logout())
      }
    })
  }, [dispatch])
  
const PrivateRoute = ({component: Component, ...rest}) => (
<Route {...rest} render = {(props) => user ? (<Component {...props}/>):
  (<Redirect to={{ pathname:"/auth", state:{from: props.location } } } />)} />
)

  return (
    <div>
      <Router>
        <Header />
        <Switch>
        <Route exact path={user?'/':'/auth'} component={user?StackOverflow:Auth} />
          <PrivateRoute exact path="/" component={StackOverflow} />
          <PrivateRoute exact path = "/add-question" component={Question} />
          <PrivateRoute exact path = "/question" component={ViewQuestion} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
