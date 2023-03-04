import React, { useState } from "react"
import NavBar from "./NavBar"
import UserList from "./userList"
import Search from "./pages/Search/Search"
import "./css/home.css"

// Home Page - Logged In

// User personalized
// Investor/crypto movements
// Include graph based on what they follow

// Home Page - Not Logged In
// Latests Trends

function Home() {
    const [word, setWord] = useState("")
    return (
      <div id="homestyle">
        <NavBar/>
        <h1 id="intro">Welcome!</h1>
        <Search word={word} setWord={setWord} />

        <div id="itemList">
          <div id="uList">
            <h3>Users</h3>
            <UserList/>
          </div>

          <div id="cList">
            <h3>Coins</h3>
          </div>

        </div>
      </div>
    )
  }
  
  export default Home