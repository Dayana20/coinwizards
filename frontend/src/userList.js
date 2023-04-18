import React, { useState, useEffect } from "react"
import axiosInstance from "./helpers/axios"
import "./css/home.css"

function UserList() {
	const [data, setData] = useState([{}])
	useEffect(() => {
		axiosInstance.get("/users/list").then(
			res => res.data
		).then(
			data => {
				setData(data)
			}            
		). catch((error) => {
			console.error("Error: ", error)
		})
	}, [])

	// console.log("data!", typeof data["users_list"])
	if (typeof data["users_list"]=="undefined"){
		return (<div>NO USERS!</div>)
	} else{
		return (<div>{data["users_list"].map(elem =><div key={elem.name}><a className="userListItem" href={"/Profile/"+String(elem.name)}>{elem.name}</a></div>)}</div>)
	}

}

export default UserList
