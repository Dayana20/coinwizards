import React, { useState } from "react"
import NavBar from "./NavBar"
import UserList from "./userList"
import Search from "./pages/Search/Search"
import CoinList from "./coinList"
import "./css/home.css"
import Form from "react-bootstrap/Form"
import Select from "react-select"
import Button from "react-bootstrap/Button"



// Home Page - Logged In

// User personalized
// Investor/crypto movements
// Include graph based on what they follow

// Home Page - Not Logged In
// Latests Trends

function Home() {
    const [word, setWord] = useState("")
    let inputText = (e) => {
      setWord(e.target.value)
    }

    return (
      <div id="homestyle">
        <NavBar/>
        <h1 id="intro">Welcome!</h1>
        <div>
          <Form className="d-flex justify-content-center" action={"Search/"+word}>
              <Form.Control
                type="search"
                placeholder="Search for User or Coin"
                onChange={inputText}
                className="me-2"
                aria-label="Search"
              />

              <a href={"Search/"+word}><Button type="submit">Search</Button></a>
            </Form>
        </div>

        <div id="itemList">
          <div id="uList">
            <h3>Users</h3>
            <UserList/>
          </div>

          <div id="cList">
            <h3>Coins</h3>
            <CoinList/>
          </div>
        </div>
      </div>
    )
  }
  
  export default Home