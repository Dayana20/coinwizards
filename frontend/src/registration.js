import React, { useState, useEffect} from "react"
import Alert from "react-bootstrap/Alert"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import NavBar from "./NavBar"
import axiosInstance from "./helpers/axios"

function Registration(){
    const [loginData, setData] = useState([{}])
    const [userName, setuserData] = useState(null)
    const [email, setEmail] = useState(null)
    const [pW, setpwData] = useState(null)
    const [confpw, setConfPw] = useState(null)
    const [registerError, setRegisterError] = useState(null)
    const [registerSuccess, setRegisterSuccess] = useState(null)
    const [alertMsg, setAlertMsg] = useState(null)

    function gettingUserName (event) {
        setuserData(event.target.value)
    }
    function gettingPassword(event) {
        setpwData(event.target.value)
    }
    function getConfirmPassword(event) {
        setConfPw(event.target.value)
    }
    function getEmail(event) {
        setEmail(event.target.value)
    }

    function sendRegister() {
        let det = {"name": userName, "password": pW, "email": email}
        axiosInstance.post("/users/add", det
        ).then(
            res => {
                setRegisterError(false)
                setRegisterSuccess(true)
            }
        ).catch((error) => {
            setRegisterError(true)
            setRegisterSuccess(false)
            console.log(error.response.data["message"])
            setAlertMsg(error.response.data["message"])
        })
    }

    return (
    <>
    <NavBar/>
    {(registerError==true) ?
        <Alert key="danger" variant="danger">{alertMsg}</Alert>
    : (registerSuccess==true ?
        <Alert key="success" variant="success">{"Successfully Signed Up!"}</Alert> : null)
    } 
    <h1 className="d-flex flex-column align-items-center" style={{textAlign:"center", marginTop:"4rem"}}> Sign Up </h1>
    <Form className="d-flex flex-column align-items-center" style={{textAlign:"center", marginTop:"2rem"}}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Control type="username" onChange={gettingUserName} placeholder="Username"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginTop:"0.5rem"}}>
        <Form.Control type="email" onChange={getEmail} placeholder="Email"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword" style={{marginTop:"0.5rem"}}>
        <Form.Control name="p1" type="password" onChange={gettingPassword} placeholder="Password"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword" style={{marginTop:"0.5rem"}}>
        <Form.Control name="p2" type="password" onChange={getConfirmPassword} placeholder="Confirm Password" />
        </Form.Group>

        <Button variant="primary" onClick={()=>sendRegister()} style={{marginTop:"1.5rem"}}>
        Submit
        </Button>
        <a href="/login" style={{marginTop:"2rem"}} >Already have an account? Sign in</a>
    </Form>
    </>
)
}

export default Registration