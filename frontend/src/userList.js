import React, { useState, useEffect } from "react"

function cleanup(userdetail){
	let det = userdetail.split(":")
	console.log(det, det.includes("name"))
	for(const i of det){
		if(i.includes("name")==false){
			return i.slice(1,-1)
		}
	}
	
	return userdetail
}

function parsedata(data){
	var userListNames = []
	for (const x of data){
		let temp = x.split(",")
		if(temp.length>1){
			for(const y of temp){
				if(y.length>1 && y.includes("name")){
					if(y.includes("users_list")){
						let name = y.split("users_list")[1]
						userListNames.push(cleanup(name.split("{")[1]))
					} else{
						userListNames.push(cleanup(y.split("{")[1]))
					}
				}
			}
		}
	}
	return userListNames
}
function UserList() {
	const [data, setData] = useState([{}])
	let userListNames = []
	console.log("NOT NEW:",data, data.length)
	// if(data.length==1){
		useEffect(() => {
			fetch("/api/users/list").then(
				res => res.json()
			).then(
				data => {
					setData(JSON.stringify(data).split("}"))
				}            
			)
		}, [])
		console.log("NEW?",data)
		
	if(data.length>1){
		console.log(data)
		userListNames = parsedata(data)
	}
	// 
	return (
		<div>
			<h3>User List:</h3>
			{userListNames.map(names=> <div><a href="/Profile">{names}</a></div>)}
			<a href="/">HERE</a>
		</div>
	)
}

export default UserList
