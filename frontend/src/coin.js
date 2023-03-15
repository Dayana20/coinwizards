import NavBar from "./NavBar"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Login from "./login" 

function CoinP(){
    const {id="CoinNameHere"} = useParams()
    const [coinData, setCoinData] = useState([{}])
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
	}, [])
 
    // for(const [key,value] of Object.entries(coinData["urls"])){
    //    urls.push([key,value])
    // }
    console.log("status", Login())
    return(
        <>
            <NavBar/>
            <div id = "coinP">
                
                <h2>Welcome back, {id}!</h2>
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
                {(Login() === false) ? (
                    <p></p>
                ) : (
                    <button> Follow </button>
                )}
            </div>
        </>

    )
}

export default CoinP