import React, { useState, useEffect} from "react"
import Alert from "react-bootstrap/Alert"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import NavBar from "./NavBar"
import axiosInstance from "./helpers/axios"

function Login(){
    const [loginData, setData] = useState([{}])
    const [userName, setuserData] = useState(null)
    const [pW, setpwData] = useState(null)
	const [logginError, setLoginStatus] = useState(null)
	// console.log("tries",logginError)    
	function gettingUserName (event) {
		setuserData(event.target.value)
		// console.log("this", event.target.value)
	}
	function gettingPassword(event) {
		setpwData(event.target.value)
		// console.log("this", event.target.value)
	}

	function loginFetch(){
		// login_STATUS["stat"] = true
		axiosInstance.get("/users/login/"+userName+"/"+pW).then(
			res => res.data
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
			setLoginStatus(true)
		})
		
	}

	console.log(logginError)
	// console.log(localStorage.getItem("stat"),localStorage.getItem("username"))
	return (
		<>
		<NavBar/>
		{(logginError==true)? <Alert key="danger" variant="danger">Check Username or Password!</Alert>
		:<div></div>
		}
		<Form>
			<Form.Group className="mb-3" controlId="formBasicUsername">
				<Form.Label>Username</Form.Label>
				<Form.Control type="username" onChange={gettingUserName} placeholder="Enter email" />
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
		<a href = "/Registration">Don"t have an account? Sign up</a>
		</>
	)
	
}

// export var login_STATUS = localStorage.getItem("stat")

export default Login