import NavBar from "./NavBar"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
// import Login from "./login" 

function CoinP(){
    const {id="CoinNameHere"} = useParams()
    const [coinData, setCoinData] = useState([{}])
    const [followingData, setFollowData] = useState([{}])
    // login not working for now
    // temp solution - user specific user geoge
    useEffect(() => {
		fetch(`/coins/details/${id}`).then(
			res => res.json()
		).then(
			data => {
                setCoinData(data[id])
			}            
		). catch((error) => {
			console.error("Error: ", error)
		})
        // followingCoin(statusLoggedIn,coinData["name"])
	}, [])
 
    let CoinFollow =(user,coin) =>{
        fetch("/users/coins/follow/"+user+"/"+coin).then(
            res => res.json()
        ).then(
            data => {
                data
            }            
        ). catch((error) => {
            console.error("Error: ", error)
        })
        alert("You are now following "+String(coin))
        window.location.reload()
    }

    let unfollowCoin =(user,coin) =>{
        fetch("/users/coins/remove/follow/"+user+"/"+coin).then(
            res => res.json()
        ).then(
            data => {
                data
            }            
        ). catch((error) => {
            console.error("Error: ", error)
        })
        alert("You are now unfollowing "+String(coin))
        window.location.reload()
    }
    
    let followingCoin =(user,coin) =>{
        fetch("/users/coins/exist/"+user+"/"+coin).then(
            res => res.json()
        ).then(
            data => {
                setFollowData(data)
            }            
        ). catch((error) => {
            console.error("Error: ", error)
        })
    }
    const statusLoggedIn = "george"
    const exist = followingCoin(statusLoggedIn,coinData["name"])
    console.log(3,statusLoggedIn, followingData)
    // followingCoin(statusLoggedIn,coinData["name"])

    return(
        <>
            <NavBar/>
            <div id = "coinP">
                
                <div>
                    <img className="bg-dark rounded-circle img-thumbnail" style={{width: "10rem", height: "10rem"}} src={coinData["logo"]}/>
                </div>

                <div>
                    <h3 id="cItem">{coinData["name"]}</h3>
                    <h3 id="cItem">{coinData["symbol"]}</h3>
                    <h3 id="cItem">Price: {coinData["price"]}</h3>
                    <h3 id="cItem">Description: {coinData["description"]}</h3>
                    {(typeof coinData["urls"] === "undefined") ? (
                        <p>URLS</p>
                    ) : (
                        <h3 id="cItem">Urls: {Object.entries(coinData["urls"]).map(([key,value]) => <div> <a href={value}> {key}</a></div>)}</h3>
                    )}
                    
                    <h3 id="cItem">Tags: {coinData["tags"]}</h3>
                    <h3 id="cItem">Date Added: {coinData["dateAdded"]}</h3>
                </div>
                {(statusLoggedIn == false || followingData == true) ? (
                    <button onClick={()=>unfollowCoin(statusLoggedIn,coinData["name"])}> Unfollow </button>
                ) : (
                    <button onClick={()=>CoinFollow(statusLoggedIn,coinData["name"])}> Follow </button>
                )}
            </div>
        </>

    )
}

export default CoinP