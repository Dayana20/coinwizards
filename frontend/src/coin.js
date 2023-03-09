import NavBar from "./NavBar"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./css/profile.css"


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
 

    return(
        <>
            <NavBar/>
            <div id = "coinP">
                
                <h2>Welcome back, {id}!</h2>
                <div>
                    <img className="bg-dark rounded-circle img-thumbnail" style={{width: "10rem", height: "10rem"}}/>
                </div>

                <div>
                    <h3 id="cItem">{coinData["name"]}</h3>
                    <h3 id="cItem">{coinData["symbol"]}</h3>
                    <h3 id="cItem">Price: {coinData["price"]}</h3>
                </div>

                <button> Follow </button>
            </div>
        </>

    )
}

export default CoinP