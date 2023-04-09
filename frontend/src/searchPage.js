import React, { useState, useEffect } from "react"
import NavBar from "./NavBar"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./css/home.css"
import Select from "react-select"
import UserNameList from "./searchList"
import { useParams } from "react-router-dom"

// search page that comes up after searching for coin/user/post
// would show user + img or coin+logo or post snippet

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
            console.log(coinData)
            // console.log(coinData.name)
            // console.log(coinData.id)
          }
        ). catch((error) => {
          console.error("Error: ", error)
          setCoinData({})

        })
      }
    }

let showCoinData = ({coin}) => {
  if (typeof coin !== "undefined") {
    return (
      <div>
          <h2>{coin.name}</h2>
          <p>Symbol: {coin.symbol}</p>
          <p>Price: {coin.price}</p>
          {/* <p>Description: {coin.description}</p> */}
          <a href={"/Coin/"+coin.name}>Go to page</a>
        </div>
  )

  } else {

    return (
      <div>No coin data available</div>
    )
  }
}

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




    if (selectedOption == null){
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
              <div className="d-flex align-items-center" style={{border: "5px solid white", height:"20vh"}}>
                <UserNameList input={word}/>
              </div>

              <h3 style={{marginTop:"5vh"}}>Coins</h3>
              <div style={{border: "5px solid white", height:"20vh"}}>

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
              <div className="d-flex align-items-center" style={{border: "5px solid white", height:"20vh"}}>
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
              <div style={{border: "5px solid white", height:"20vh"}}>
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
              <div className="d-flex align-items-center" style={{border: "5px solid white", height:"20vh"}}>
                <UserNameList input={word}/>
              </div>

            </div>

          </>
        )
      }
  }

  export default SearchPage