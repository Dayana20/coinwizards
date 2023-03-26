import React from "react"
import ReactDOM from "react-dom"
import Home from "./Home"
import App from "./App"
import NavBar from "./NavBar"
import UserList from "./userList"
import ProfileP from "./profile"
import CoinP from "./coin"
import reportWebVitals from "./reportWebVitals"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import SearchPage from "./searchPage"


ReactDOM.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/Home" element={<Home/>}/>
    <Route path="/Profile/" element={<ProfileP/>}/>
    <Route path="/login/" element={<login/>}/>
    <Route path="/Profile/:id" element={<ProfileP/>}/>
    <Route path="/Coin/" element={<CoinP/>}/>
    <Route path="/Coin/:id" element={<CoinP/>}/>
    <Route path="/Search/" element={<SearchPage/>}/>

  </Routes>
  </BrowserRouter>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
