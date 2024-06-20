import React, { useEffect } from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/homeScreen/HomeScreen";
import ProfileScreen from "./pages/ProfileScreen/ProfileScreen";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firbase";

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth,(userAuth) =>{
      if(userAuth){
        dispatch(login({
          uid:userAuth.uid,
          email:userAuth.email
        }))
      }else{
        dispatch(logout())
      }
    })
    return unsubscribe
  },[])
  console.log('user',user)


  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
};

export default App;
