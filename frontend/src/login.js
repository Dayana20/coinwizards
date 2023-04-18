import React, { useState, useEffect } from "react"
import axiosInstance from "./helpers/axios"
// import React from "react"
// import { BrowserRouter, Route, Routes } from "react-router"
// import "./App.css"
// import Dashboard from "../Dashboard/Dashboard"
// import Login from "../Login/Login"
// import Preferences from "../Preferences/Preferences"
// import useToken from "./useToken"

// function login() {

// 	const { token, setToken } = useToken()

// 	if(!token) {
// 		return <Login setToken={setToken} />
// 	}

// 	return (
// 		<div className="wrapper">
// 			<h1>Application</h1>
// 			<BrowserRouter>
// 				<Switch>
// 					<Route path="/dashboard">
// 						<Dashboard />
// 					</Route>
// 					<Route path="/preferences">
// 						<Preferences />
// 					</Route>
// 				</Switch>
// 			</BrowserRouter>
// 		</div>
// 	)
// }

// export default login

// temporary way to get logged in and out
// let userLoggedIn=true

function Login(){
    const [data, setData] = useState([{}])
	// PASSWORD IS ENCRYPT SO NEED TO DECRYPT FIRST TO COMPAREÍ
    useEffect(() => {
		axiosInstance.get("/users/login/user1/string").then(
			res => res.data
		).then(
			data => {
				setData(data)
				// console.log("lgoin",data)
			}            
		). catch((error) => {
			console.error("Error: ", error)
		})
	}, [])
    // console.log("type", data["Data"])
    if(data["Data"]=="Cannot login: Wrong Password"){
        return(false)
    } else{
        return(("george"))
    }
    
}

export default Login