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