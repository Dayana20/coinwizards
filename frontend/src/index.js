import React from "react"
import ReactDOM from "react-dom"
import Home from "./Home"
import App from "./App"
import NavBar from "./NavBar"
import UserList from "./userList"
import ProfileP from "./profile"
import CoinP from "./coin"
import FollowersP from "./followers"
import FollowingP from "./following"
import reportWebVitals from "./reportWebVitals"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import SearchPage from "./searchPage"
import Registration10 from "./registration"
import Login from "./login"
import ComingSoon from "./comingsoon"
import AccountSettings from "./account"
// import {login_STATUS} from "./login"

// export var login_STATUS = false
let status = localStorage.getItem("stat")
if(status=="false"){
  // logged in
  ReactDOM.render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/Profile/" element={<ProfileP/>}/>
      <Route path="/login/" element={<Login/>}/>
      <Route path="/Profile/:id" element={<ProfileP/>}/>
      <Route path="/Profile/:id/followers" element={<FollowersP/>}/>
      <Route path="/Profile/:id/following" element={<FollowingP/>}/>
      <Route path="/Coin/" element={<CoinP/>}/>
      <Route path="/Coin/:id" element={<CoinP/>}/>
      <Route path="/Search/" element={<SearchPage/>}/>
      <Route path="/Search/:id" element={<SearchPage/>}/>
      <Route path="/Registration" element={<Registration10/>}/>
      <Route path="/Resources/" element={<ComingSoon/>}/>
      
    </Routes>
    </BrowserRouter>,
    document.getElementById("root")
  )
} else{
  ReactDOM.render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/Profile/:id" element={<ProfileP/>}/>
      <Route path="/Profile/:id/followers" element={<FollowersP/>}/>
      <Route path="/Profile/:id/following" element={<FollowingP/>}/>
      <Route path="/Coin/" element={<CoinP/>}/>
      <Route path="/Coin/:id" element={<CoinP/>}/>
      <Route path="/Search/" element={<SearchPage/>}/>
      <Route path="/Search/:id" element={<SearchPage/>}/>
      <Route path="/Registration" element={<Registration10/>}/>
      <Route path="/Account/:id" element={<AccountSettings/>}/>
      <Route path="/Privacy/:id" element={<ComingSoon/>}/>
      <Route path="/Resources/" element={<ComingSoon/>}/>

    </Routes>
    </BrowserRouter>,
    document.getElementById("root")
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
