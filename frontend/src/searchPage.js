import React, { useState, useEffect } from "react"
import axiosInstance from "./helpers/axios"
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
      axiosInstance.get("/options").then(
        res => res.data
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
        axiosInstance.get("/users/details/"+name).then(
          res => res.data
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
      if(name!=""){
        axiosInstance.put("/coins/add/"+name).then(
          res => res.data
        ).then(
          data => {
            setNewCoinData(data)
          }
        ). catch((error) => {
          console.error("Error: ", error)
        })
      }
    }

    // console.log("coin data", Object.keys(newCoinData).includes("0"))
    let showCoinData = ({coin}) => {
      if(id!="" && word==id && Object.keys(newCoinData).includes("name")){
        // console.log(newCoinData)
        return(
          <div className="d-flex flex-row flex-wrap align-items-center justify-content-evenly">
            <div className="d-flex align-items-center justify-content-center" style={{minWidth:"20vh", maxWidth:"30svh", marginLeft:"3vh",marginBottom:"1rem"}}>
              <img className="bg-dark rounded-circle img-thumbnail" style={{width: "5rem", height: "5rem", marginBottom:"2vw"}} src={newCoinData.logo}/>
              <a className="coinListItem" href={"/Coin/"+newCoinData.name}><h2>{newCoinData.name}</h2></a>
            </div>
          </div>
          )
      } else if(Object.keys(newCoinData).includes("name")){
        console.log(coin)
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
          <div></div>
        )
      }
    }
    // console.log("id",id, "word",word, "coin data", newCoinData)
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
              <div className="d-flex flex-wrap">
                <UserNameList input={word}/>
              </div>

              <h3 style={{marginTop:"5vh"}}>Coins</h3>
              <div className="d-flex align-items-center flex-wrap justify-content-evenly">
                {/* {(Object.keys(newCoinData).includes("0") && word!="")? showCoinData({ coin: findCoins(word) })
                : (word!=id || word!=newCoinData["name"] || id=="")? <CoinList input={word}/>
                : showCoinData({ coin: newCoinData})
                } */}
                {(id=="" && (Object.keys(newCoinData).includes("0") || newCoinData["name"]!=word )&& word!="")? <CoinList input={word}/>
                : (id=="" && word!="")? showCoinData({ coin: newCoinData})
                : (id!="" && word==id && Object.keys(newCoinData).includes("0") )? showCoinData({ coin: findCoins(id)})
                : (id!="" && newCoinData["name"]==word)? showCoinData({ coin: newCoinData})
                : (id!="")? <CoinList input={word}/>
                : <CoinList input={word}/>
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
                  
                  <Button onClick={()=>findUsers(word)} variant="outline-success">Search</Button>
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
                  
                  <Button onClick={()=>findCoins(word)} variant="outline-success">Search</Button>
                </Form>
              </div>
              <div className="d-flex align-items-center flex-wrap justify-content-evenly">
                {/* {(Object.keys(newCoinData).includes("0") || word!=id)? <CoinList input={word}/> 
                : (word!=newCoinData["name"])? <CoinList input={word}/> 
                : showCoinData({ coin: newCoinData })
                } */}
                {(id=="" && (Object.keys(newCoinData).includes("0") || newCoinData["name"]!=word )&& word!="")? <CoinList input={word}/>
                : (id=="" && word!="")? showCoinData({ coin: newCoinData})
                : (id!="" && word==id && Object.keys(newCoinData).includes("0") )? showCoinData({ coin: findCoins(id)})
                : (id!="" && newCoinData["name"]==word)? showCoinData({ coin: newCoinData})
                : (id!="")? <CoinList input={word}/>
                : <CoinList input={word}/>
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
