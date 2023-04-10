import React, { useState, useEffect } from "react"
import "./css/home.css"

function CoinList(searchBarInput="") {
	const [data, setData] = useState([{}])
	const [coinDetData, setDetData] = useState([{}])
	useEffect(() => {
		fetch("/coins/list").then(
			res => res.json()
		).then(
			data => {
				setData(data)
				let temp = []
				for(let elem=0; elem<data["coins_list"].length; elem++){
					temp.push([data["coins_list"][elem].name, data["coins_list"][elem].logo])
				}
				setDetData(temp)
			}            
		). catch((error) => {
			console.error("Error: ", error)
		})
	}, [])

	if(window.location.href.includes("Search")){
		// console.log("in search", coinDetData.length,data)
		if(coinDetData.length!=1){
			let filteredCoinData = coinDetData.filter(([names,logo]) => {
				// return all names if nothing specific is searched
				// console.log("name", names, logo)
				if (searchBarInput.input === "") {
					return names
				}
				else {
					return names.includes(searchBarInput.input)   
				}
			})
			return (
				<>
					{filteredCoinData.map(([item,logo]) => (
						<div className="d-flex flex-row flex-wrap align-items-center justify-content-evenly">
						<div className="d-flex align-items-center justify-content-center" style={{border: "5px solid white", minWidth:"20vh", maxWidth:"30svh", marginLeft:"3vh",marginBottom:"1rem"}}>
							<img className="bg-dark rounded-circle img-thumbnail" style={{width: "5rem", height: "5rem", marginBottom:"2vw"}} src={logo}/>
							<a id="coinListItem" href={"/Coin/"+item}><h2>{item}</h2></a>
						</div>
						</div>))}
				</>
				)
		} else{
			return (<div>NO COINS!</div>)
		}	

	} else{
		// console.log("data!", typeof data["users_list"])
		if (typeof data["coins_list"]=="undefined"){
			return (<div>NO USERS!</div>)
		} else{
			return (<div>{data["coins_list"].map(elem =><div><a id="coinListItem" href={"/Coin/"+String(elem.name)}>{elem.name}</a></div>)}</div>)
		}
	}
}

export default CoinList
