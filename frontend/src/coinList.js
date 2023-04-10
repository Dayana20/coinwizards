import React, { useState, useEffect } from "react"
import "./css/home.css"

function CoinList() {
	const [data, setData] = useState([{}])
	useEffect(() => {
		fetch("/coins/list").then(
			res => res.json()
		).then(
			data => {
				setData(data)
				console.log("fetched:", data["coins_list"])
			}            
		). catch((error) => {
			console.error("Error: ", error)
		})
	}, [])
	console.log(window.location.href.includes("Search"))
	if(window.location.href.includes("Search")){
		if (typeof data["coins_list"]=="undefined"){
			return (<div>NO USERS!</div>)
		} else{
			return (<div className="d-flex flex-row flex-wrap align-items-center justify-content-evenly">{data["coins_list"].map(
				elem =><div className="d-flex align-items-center justify-content-center" style={{border: "5px solid white", height:"8vw", minWidth:"18vh", maxWidth:"18vh", marginLeft:"3vh",marginBottom:"1rem"}}>
					<a id="coinListItem" href={"/Coin/"+String(elem.name)}>{elem.name}</a>
					</div>)}</div>)
		}
	}
	// console.log("data!", typeof data["users_list"])
	if (typeof data["coins_list"]=="undefined"){
		return (<div>NO USERS!</div>)
	} else{
		return (<div>{data["coins_list"].map(elem =><div><a id="coinListItem" href={"/Coin/"+String(elem.name)}>{elem.name}</a></div>)}</div>)
	}

}

export default CoinList
