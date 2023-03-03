import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"


// function cleanup(userdetail){
// 	let det = userdetail.split(":")
// 	console.log(det, det.includes("name"))
// 	for(const i of det){
// 		if(i.includes("name")==false){
// 			return i.slice(1,-1)
// 		}
// 	}
	
// 	return userdetail
// }

// function parsedata(data){
// 	var userListNames = []
// 	for (const x of data){
// 		let temp = x.split(",")
// 		if(temp.length>1){
// 			for(const y of temp){
// 				if(y.length>1 && y.includes("name")){
// 					if(y.includes("users_list")){
// 						let name = y.split("users_list")[1]
// 						userListNames.push(cleanup(name.split("{")[1]))
// 					} else{
// 						userListNames.push(cleanup(y.split("{")[1]))
// 					}
// 				}
// 			}
// 		}
// 	}
// 	return userListNames
// }

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

	// console.log("data: ", data)
	// if(data.length>=1){
	// 	for (let x of data.users_list){
	// 		console.log("item:", x)
	// 		// userListNames.push(x.name)
	// 	}
	// }

	// data = JSON.stringify(data).split("}")
	// if(data.length>1){
	// 	console.log(data)
	// 	userListNames = parsedata(data)
	// }

	return (
		<div>
			<h3>User List :</h3>

			{userListNames.map(elem => 
			<div>
				{/* <a href={"/Profile/"+{elem}+""}>
					{elem}
				</a> */}
				HIHIH
			</div>)}

		</div>
	)
}

export default UserList
