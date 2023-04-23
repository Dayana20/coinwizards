import React, { useState, useEffect } from "react"
import NavBar from "./NavBar"
import { useParams } from "react-router-dom"
import axiosInstance from "./helpers/axios"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Select from "react-select"
import axios from "axios"
import Alert from "react-bootstrap/Alert"


function AccountSettings() {
  const {id="UserNameHere"} = useParams()
  const [userData, setUserData] = useState([{}])
  const [selectedOption, setSelectedOption] = useState(null)
  const [UserPassword, setUserPassword] = useState(null)
  const [UserEmail, setUserEmail] = useState(null)
  const [message, setMessage] = useState(null)

  
  // console.log(id)
  let inputTextEmail = (e) => {
    console.log("email", e.target.value)
    setUserEmail(e.target.value)
  }

  let inputTextPassword = (e) => {
    console.log("password", e.target.value)
    setUserPassword(e.target.value)

  }

  let deleteAccount = () => {
    if(confirm("You are now deleting your account ")){
      axiosInstance.delete(`/users/remove/${id}`).then(
        res => res.data
      ).then(
        data => {
          console.log(data)
        }            
      ). catch((error) => {
        console.error("Error: ", error)
      })
      localStorage.setItem("stat","false")
      localStorage.setItem("username",null)
      // need to add axiosInstance
      window.location = "/"
    } else{
      console.log("Account not deleted")
    }
  }

  // show error messages
  // need to change both password and email to work
  // will give error message if try saving one without modifications
  let saveDets = ()=> {
    console.log("saving")
    let det = {"new_password": UserPassword, "new_email": UserEmail}
    axiosInstance.put(`/users/details/update/${id}`, det
    ).then(
      res => res.data
    ).then(
      data => {
        setMessage(`updated account for ${id}`)

      }            
    ). catch((error) => {
      console.error("Error: ", error)
      setMessage(error["response"]["data"]["message"])
    })
  }

  useEffect(() => {
    axiosInstance.get(`/users/details/${id}`).then(
      res => res.data
    ).then(
      data => {
        setUserData(data["Data"])
        console.log(data["Data"])
      }            
    ). catch((error) => {
      console.error("Error: ", error)
    })
  }, [])

  let email = null
  let name = null
  if(Object.keys(userData).includes(id)){
    console.log(Object.keys(userData[id]["Name"]))
    email = userData[id]["Name"]["email"]
    name = userData[id]["Name"]["name"]
  }

  return (
      <>
      <NavBar/>
      {(message==null)? <div></div>
      :(message.includes("failed"))? <Alert key="danger" variant="danger">{message}!</Alert>
      :<Alert key="danger" variant="success">{message}!</Alert>
      }
      <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"50vh"}}>
          <h2>Update User Settings {}</h2>
          <Form className="d-flex flex-column justify-content-center">
            Username:
            <Form.Control
              type="username"
              placeholder="username"
              // onChange={inputText}
              readOnly="readonly"
              className="me-2"
              style={{backgroundColor:"gray"}}
              defaultValue={name}
            />
            Email:
            <Form.Control
              type="email"
              placeholder="email"
              onChange={inputTextEmail}
              className="me-2"
              aria-label="Search"
              defaultValue={email}
            />
            Password
            <Form.Control
              type="password"
              placeholder="password"
              onChange={inputTextPassword}
              className="me-2"
              aria-label="Search"
            />
            
            <Button onClick={()=>saveDets()} variant="outline-success">Update</Button>
            <Button onClick={()=>deleteAccount()} variant="outline-success">Delete Account</Button>
          </Form>
          
      </div>
    </>
  )
}

export default AccountSettings