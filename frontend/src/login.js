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
<h1 className="d-flex flex-column align-items-center" style={{textAlign:"center", marginTop:"4rem"}}> Login </h1>
		<Form className="d-flex flex-column align-items-center" style={{textAlign:"center", marginTop:"2rem"}}>
			<Form.Group className="mb-3" controlId="formBasicUsername">
				<Form.Control type="username" onChange={gettingUserName} placeholder="Username" />
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Control type="password" onChange={gettingPassword} placeholder="Password" />
			</Form.Group>
			<Button variant="primary" onClick={()=>loginFetch()} style={{marginTop:"1.5rem"}}>
				Submit
			</Button>
			<a href="/Registration" style={{marginTop:"2rem"}}>Don't have an account? Sign up</a>
		</Form>
		</>
	)
	
}

// export var login_STATUS = localStorage.getItem("stat")

export default Login