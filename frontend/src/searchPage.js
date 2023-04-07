import React, { useState, useEffect } from "react"
import NavBar from "./NavBar"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./css/home.css"
import Select from "react-select"


// search page that comes up after searching for coin/user/post
// would show user + img or coin+logo or post snippet

function SearchPage() {
    const [word, setWord] = useState("")
    const [data, setData] = useState([{}])
    const [userData, setUserData] = useState([{}])


    let inputText = (e) => {
      setWord(e.target.value.toLowerCase())
    }

    const [menuData, setMenuData] = useState([{}])
    useEffect(() => {
      fetch("/options").then(
        res => res.json()
      ).then(
          data => {
            setData(data)
        }            
      ). catch((error) => {
        console.error("Error: ", error)
      })
    }, [])

    let findUsers = (name) => {
      if(name!=""){
        fetch("/users/details/"+name).then(
          res => res.json()
        ).then(
          data => {
            setUserData(data["Data"][name])
            
          }            
        ). catch((error) => {
          console.error("Error: ", error)
          setUserData([{}])
        })
      }
    }
    console.log(word)
    let options = [{value:"All", label:"All"}]
    return (
      <>
        <NavBar/>
        <div id="searchbar" style={{marginTop:"5vh",marginBottom:"5vh"}}>
            <Form className="d-flex justify-content-center">
              <Select options={menuData["Choices"]}/>
              <Form.Control
                type="search"
                placeholder="Search"
                onChange={inputText}
                className="me-2"
                aria-label="Search"
              />
              <Button onClick={()=>findUsers(word)} variant="outline-success">Search</Button>
            </Form>
        </div>

        <div>
          <h3>Users</h3>
          <div style={{border: "5px solid white", height:"20vh"}}>
            {(typeof userData[0]=="object") ? (
                <p>NO RESULTS</p>
                
            ) : (
              userData["Name"]["name"]
            )}
          </div>

          <h3 style={{marginTop:"5vh"}}>Coins</h3>
          <div style={{border: "5px solid white", height:"20vh"}}>
            
          </div>
        </div>
        
      </>
    )
  }
  
  export default SearchPage