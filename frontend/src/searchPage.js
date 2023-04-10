import React, { useState, useEffect } from "react"
import NavBar from "./NavBar"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./css/home.css"
import Select from "react-select"
import UserNameList from "./searchList"
import { useParams } from "react-router-dom"
import CoinList from "./coinList"


// search page that comes up after searching for coin/user/post
// would show user + img or coin+logo or post snippet

function SearchPage() {
    const {id=""} = useParams()
    const [word, setWord] = useState("")
    const [menuData, setMenuData] = useState([{}])
    const [userData, setUserData] = useState([{}])
    console.log("input data", id, typeof id, id!="TermName", word, typeof word)
    const [selectedOption, setSelectedOption] = useState(null)

    let inputText = (e) => {
      setWord(e.target.value)
    }

    useEffect(() => {
      fetch("/options").then(
        res => res.json()
      ).then(
          data => {
            setMenuData(data)
        }            
      ). catch((error) => {
        console.error("Error: ", error)
      })
      setWord(id)
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

    if (selectedOption == null || selectedOption.label =="all"){
      return (
        <>
         <NavBar/>
          <div id="searchbar" style={{marginTop:"5vh",marginBottom:"5vh"}}>
              <Form className="d-flex justify-content-center">
                <Select className="selectB"
                  options={menuData["Choices"]}
                  onChange={setSelectedOption}
                  defaultValue={selectedOption}
                />
                <Form.Control
                  type="search"
                  placeholder="Search"
                  onChange={inputText}
                  className="me-2"
                  aria-label="Search"
                  defaultValue={id}
                />

                <Button onClick={()=>findUsers(word)} variant="outline-success">Search</Button>
              </Form>
            </div>
            <div>
              <h3>Users</h3>
              <div className="d-flex align-items-center">
                <UserNameList input={word}/>
              </div>

              <h3 style={{marginTop:"5vh"}}>Coins</h3>
              <div>
                <CoinList/>
              </div>
            </div>
        </>
      )

    } else if(selectedOption.label=="users"){
      return (
        <>
          <NavBar/>
          <div id="searchbar" style={{marginTop:"5vh",marginBottom:"5vh"}}>
            <Form className="d-flex justify-content-center">
              <Select className="selectB"
                options={menuData["Choices"]}
                onChange={setSelectedOption}
                defaultValue={selectedOption}
              />
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
              <div className="d-flex align-items-center">
                <UserNameList input={word}/>
              </div>
            </div>
        </>
      )
    } else if(selectedOption.label=="coins"){
      return (
        <>
          <NavBar/>
          <div id="searchbar" style={{marginTop:"5vh",marginBottom:"5vh"}}>
            <Form className="d-flex justify-content-center">
              <Select className="selectB"
                options={menuData["Choices"]}
                onChange={setSelectedOption}
                defaultValue={selectedOption}
              />
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
              <h3 style={{marginTop:"5vh"}}>Coins</h3>
              <div>
                <CoinList/>
              </div>
            </div>
        </>
      )
    } else{
        return (
          <>
            <NavBar/>
            <div style={{marginTop:"5vh",marginBottom:"5vh"}}>
              <Form className="d-flex justify-content-center">
                <Select className="selectB"
                  options={menuData["Choices"]}
                  onChange={setSelectedOption}
                  defaultValue={selectedOption}
                />
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
              <h3>Posts</h3>
              <div className="d-flex align-items-center">
                <UserNameList input={word}/>
              </div>
            </div>
          </>
        )
      }
  }
  
  export default SearchPage