import React, { useState, useEffect } from "react"

function UserList() {
	const [data, setData] = useState([{}])
	useEffect(() => {
		fetch("/users/list").then(
			res => res.json()
		).then(
			data => {
				setData(data)
				console.log("fetched:", data["users_list"])
			}            
		). catch((error) => {
			console.error("Error: ", error)
		})
	}, [])

	console.log("data!", typeof data["users_list"])
	if (typeof data["users_list"]=="undefined"){
		return (<div>NO USERS!</div>)
	} else{
		return (<div>{data["users_list"].map(elem =><div><a href={"/Profile/"+String(elem.name)}>{elem.name}</a></div>)}</div>)
	}

}

export default UserList
