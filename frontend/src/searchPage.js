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
    const [selectedOption, setSelectedOption] = useState(null)
    const [newCoinData, setNewCoinData] = useState([{}])


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
        })
      }
    }

    let findCoins = (name) => {
      console.log("In find coins function")
      if(name!=""){
        fetch("/coins/add/"+name).then(
          res => res.json()
        ).then(
          data => {
            setNewCoinData(data)
          }
        ). catch((error) => {
          console.error("Error: ", error)
        })
      }
    }

    console.log("coin data", Object.keys(newCoinData).includes("0"))
    let showCoinData = ({coin}) => {
      if(Object.keys(newCoinData).includes("0")){
        return(
          <div></div>
        )
      } else if(!Object.keys(newCoinData).includes("message")){
        return(
            <div className="d-flex flex-row flex-wrap align-items-center justify-content-evenly">
              <div className="d-flex align-items-center justify-content-center" style={{minWidth:"20vh", maxWidth:"30svh", marginLeft:"3vh",marginBottom:"1rem"}}>
                <img className="bg-dark rounded-circle img-thumbnail" style={{width: "5rem", height: "5rem", marginBottom:"2vw"}} src={coin.logo}/>
                <a className="coinListItem" href={"/Coin/"+coin.name}><h2>{coin.name}</h2></a>
              </div>
            </div>
            )
      }
      else{
        return(
          <h5>No Coins Found!</h5>
        )
      }
    }
    console.log("id",id, word, newCoinData["name"])
    return (
      <>
        <NavBar/>
          <div>
            {(selectedOption == null || selectedOption.label =="All")? 
            <div>
              <div id="searchbar" style={{marginTop:"5vh",marginBottom:"5vh"}}>
              <Form className="d-flex justify-content-center">
                <Select className="selectB"
                  options={menuData["Choices"]}
                  onChange={setSelectedOption}
                  placeholder={"All"}
                />
                <Form.Control
                  type="search"
                  placeholder="Search For Coin or User"
                  onChange={inputText}
                  className="me-2"
                  aria-label="Search"
                  defaultValue={id}
                />
                
                <Button onClick={()=>findAll(word)} variant="outline-success">Search</Button>
              </Form>
              </div>
              <h3>Users</h3>
              <div className="d-flex align-items-center flex-wrap">
                <UserNameList input={word}/>
              </div>

              <h3 style={{marginTop:"5vh"}}>Coins</h3>
              <div className="d-flex align-items-center flex-wrap">
                {(Object.keys(newCoinData).includes("0") && id!="")? showCoinData({ coin: findCoins(word) })
                : (word!=id || word!=newCoinData["name"] || id=="")? <CoinList input={word}/>
                : showCoinData({ coin: newCoinData})
                }

              </div>
            </div>
            : (selectedOption.label =="Users") ? 
            <div>
              <div id="searchbar" style={{marginTop:"5vh",marginBottom:"5vh"}}>
                <Form className="d-flex justify-content-center">
                  <Select className="selectB"
                    options={menuData["Choices"]}
                    onChange={setSelectedOption}
                    placeholder={"Users"}
                  />
                  <Form.Control
                    type="search"
                    placeholder="Search For User"
                    onChange={inputText}
                    className="me-2"
                    aria-label="Search"
                    defaultValue={id}
                  />
                  
                  <Button onClick={()=>findAll(word)} variant="outline-success">Search</Button>
                </Form>
              </div>
              <h3>Users</h3>
              <div className="d-flex align-items-center flex-wrap">
                <UserNameList input={word}/>
              </div>
            </div>
            :  (selectedOption.label =="Coins") ? 
            <div>
                <div id="searchbar" style={{marginTop:"5vh",marginBottom:"5vh"}}>
                <Form className="d-flex justify-content-center">
                  <Select className="selectB"
                    options={menuData["Choices"]}
                    onChange={setSelectedOption}
                    placeholder={"Coins"}
                  />
                  <Form.Control
                    type="search"
                    placeholder="Search For Coin"
                    onChange={inputText}
                    className="me-2"
                    aria-label="Search"
                    defaultValue={id}
                  />
                  
                  <Button onClick={()=>findAll(word)} variant="outline-success">Search</Button>
                </Form>
              </div>
              <div className="d-flex align-items-center flex-wrap">
                {(Object.keys(newCoinData).includes("0") || word!=id)? <CoinList input={word}/> 
                : (word!=newCoinData["name"])? <CoinList input={word}/> 
                : showCoinData({ coin: newCoinData })
                }
              </div>
            </div>
            : <div>
              <div id="searchbar" style={{marginTop:"5vh",marginBottom:"5vh"}}>
                <Form className="d-flex justify-content-center">
                  <Select className="selectB"
                    options={menuData["Choices"]}
                    onChange={setSelectedOption}
                    placeholder={"Coins"}
                  />
                  <Form.Control
                    type="search"
                    placeholder="Search For Coin"
                    onChange={inputText}
                    className="me-2"
                    aria-label="Search"
                    defaultValue={id}
                  />
                  
                  <Button onClick={()=>findAll(word)} variant="outline-success">Search</Button>
                </Form>
              </div>
              Coming Soon
              </div>
            }


          </div>
      </>
  )
} 
  export default SearchPage
