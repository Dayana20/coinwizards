import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"


function UserList() {
	const [data, setData] = useState([{}])
	let userListNames = []
	useEffect(() => {
		fetch("/users/list").then(
			res => res.json()
		).then(
			data => {
				setData(data)
				console.log("data: ",data)
			}            
		). catch((error) => {
			console.error("Error:", error)
		})
	}, [])

	console.log("data: ", data["users_list"].length)
	if(data["users_list"].length>=1){
		for (let x of data["users_list"]){
			console.log("item:", x.name)
			userListNames.push(x.name)
		}
	}

	return (
		<div>
			<h3>User List :</h3>

			{userListNames.map(elem => 
				<div>
					<a href={"/Profile/"+{elem}+""}>{elem}</a>
				</div>)
			}

		</div>
	)
}

export default UserList
