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
            <div className="d-flex flex-column">
                <div className="d-flex flex-row align-items-center">
                    <div className="d-flex flex-column align-items-start">
                        <img className="bg-dark rounded-circle img-thumbnail" style={{width: "10rem", height: "10rem", marginBottom:"2vw"}} src={coinData["logo"]}/>
                        <div className="d-flex flex-column justify-content-center">
                            <h3 className="cItem">{coinData["name"]}</h3>
                            <h3 className="cItem">{coinData["symbol"]}</h3>
                            <h3 className="cItem">Value: {coinData["price"]}</h3>
                            <h3 className="cItem">Date Added: {coinData["dateAdded"]}</h3>
                            {(typeof coinData["tags"] === "undefined") ? (
                                <p>Tags</p>
                            ) : (
                                <h3 className="cItem d-flex flex-column align-items-center">Tags: {Object.entries(coinData["tags"]).map((elem) => <div key={elem} className="cButton"> {elem}</div>)}</h3>
                            )}

                            {(statusLoggedIn == false || followingData == true) ? (
                                <button onClick={()=>unfollowCoin(statusLoggedIn,coinData["name"])}> Unfollow </button>
                            ) : (
                                <button onClick={()=>CoinFollow(statusLoggedIn,coinData["name"])}> Follow </button>
                            )}
                        </div>
                    </div>                    
                    <div className="d-flex flex-column justify-content-center" style={{marginTop:"5vw", marginLeft:"5vw", marginRight:"5vw"}}>
                        <h3 className="cItem">Description: {coinData["description"]}</h3>
                        {(typeof coinData["urls"] === "undefined") ? (
                            <p>URLS</p>
                        ) : (
                            <h3 className="cItem d-flex flex-column align-items-center">Urls: {Object.entries(coinData["urls"]).map(([key,value]) => <button key={key}> <a className="cButton" href={value}> {key}</a></button>)}</h3>
                        )}
                    </div>
                </div>
            </div>
        </>

    )
}

export default CoinP