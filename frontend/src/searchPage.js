import React, { useState, useEffect } from "react"
import NavBar from "./NavBar"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./css/home.css"
import Select from "react-select"
import UserNameList from "./searchList"
import { useParams } from "react-router-dom"
import CoinList from "./coinList"


function SearchPage() {
    const {id=""} = useParams()
    const [word, setWord] = useState("")
    const [menuData, setMenuData] = useState([{}])
    const [userData, setUserData] = useState([{}])
    console.log("input data", id, typeof id, id!="TermName", word, typeof word)
    const [selectedOption, setSelectedOption] = useState(null)
    const [coinData, setCoinData] = useState({})

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

    let findAll = (name)=> {
      findUsers(name)
      findCoins(name)
      console.log("found both")
    }

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

    let findCoins = (name) => {
      if(name!=""){
        fetch("/coins/details/"+name).then(
          res => res.json()
        ).then(
          data => {
            setCoinData(data[name])
          }
        ). catch((error) => {
          console.error("Error: ", error)
          setCoinData({})

        })
      }
    }

    let showCoinData = ({coin}) => {
      console.log("coin data2", coin.name, coin)
      if (typeof coin !== "undefined") {
        return (
          <div className="d-flex flex-row flex-wrap align-items-center justify-content-evenly">
            <div className="d-flex align-items-center justify-content-center" style={{border: "5px solid white", minWidth:"20vh", maxWidth:"30svh", marginLeft:"3vh",marginBottom:"1rem"}}>
              <img className="bg-dark rounded-circle img-thumbnail" style={{width: "5rem", height: "5rem", marginBottom:"2vw"}} src={coinData.logo}/>
              <a id="coinListItem" href={"/Coin/"+coin.name}><h2>{coin.name}</h2></a>
            </div>
          </div>
      )
    }}

    const clearCoinData = () => {
      setCoinData(null)
      // setUserData(null)
    }

    const handleSearch = (event) => {
      event.preventDefault()
      clearCoinData() // clear the coinData state
      if (selectedOption.label === "coins") {
        findCoins(word)
      } else{
        findUsers(word)
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

              <Button onClick={()=>findAll(word)} variant="outline-success">Search</Button>
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
          <Form className="d-flex justify-content-center" onSubmit={handleSearch}>
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
            <Button onClick={()=>findCoins(word)} variant="outline-success">Search</Button>
          </Form>
        </div>
        <div>
            <h3 style={{marginTop:"5vh"}}>Coins</h3>
            <div>
              <CoinList/>
              {showCoinData({ coin: coinData })}
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
      )}
  }

  export default SearchPage
