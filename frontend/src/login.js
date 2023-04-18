import React, { useState, useEffect } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import NavBar from "./NavBar"
// import { login_STATUS } from "."
// import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from "mdb-react-ui-kit"
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

// export var login_STATUS = false

function Login(){
    const [loginData, setData] = useState([{}])
    const [userName, setuserData] = useState(null)
    const [pW, setpwData] = useState(null)

    
	function gettingUserName (event) {
		setuserData(event.target.value)
		console.log("this", event.target.value)
	}
	function gettingPassword(event) {
		setpwData(event.target.value)
		console.log("this", event.target.value)
	}

	function loginFetch(){
		// login_STATUS["stat"] = true
		fetch("/users/login/"+userName+"/"+pW).then(
			res => res.json()
		).then(
			data => {
				setData(data)
				if(data==true){
					localStorage.setItem("stat",data)
					localStorage.setItem("username",userName)
					console.log("here", localStorage.getItem("stat"),localStorage.getItem("username"))
					document.location.href = "profile/"+userName
				}
			}            
		). catch((error) => {
			console.error("Error: ", error)
		})
		
	}

	console.log(localStorage.getItem("stat"),localStorage.getItem("username"))
    if(loginData["Data"]=="Cannot login: Wrong Password"){
        return(false)
    } else{
		return (
			<>
			<NavBar/>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" onChange={gettingUserName} placeholder="Enter email" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" onChange={gettingPassword} placeholder="Password" />
				</Form.Group>
				{/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="Check me out" />
				</Form.Group> */}
				<Button variant="primary" onClick={()=>loginFetch()}>
					Submit
				</Button>
			</Form>
			</>
		)
	}
}

// export var login_STATUS = localStorage.getItem("stat")

export default Login