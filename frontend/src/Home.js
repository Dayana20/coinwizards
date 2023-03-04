import React from "react"
import NavBar from "./NavBar"
import UserList from "./userList"

// Home Page - Logged In

// User personalized
// Investor/crypto movements
// Include graph based on what they follow

// Home Page - Not Logged In
// Latests Trends

function Home() {
    return (
      <div>
        <NavBar/>
        <h1>Welcome!</h1>
        <UserList/>
      </div>
    )
  }
  
  export default Home