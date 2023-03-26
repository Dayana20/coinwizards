import React, { useState } from "react"
import NavBar from "./NavBar"
import UserList from "./userList"
import Search from "./pages/Search/Search"
import CoinList from "./coinList"
import "./css/home.css"
import Login from "./login" 

// search page that comes up after searching for coin/user/post
// would show user + img or coin+logo or post snippet

function SearchPage() {
    const [word, setWord] = useState("")
    console.log("word:",word)
    return (
      <div>
        <NavBar/>
        <div>
          <Search word={word} setWord={setWord} />
        </div>

        <div>
          <h3>Users</h3>
          <div style={{border: "5px solid white", height:"20vh"}}>

          </div>

          <h3 style={{marginTop:"5vh"}}>Coins</h3>
          <div style={{border: "5px solid white", height:"20vh"}}>
            
          </div>
        </div>
      </div>
    )
  }
  
  export default SearchPage