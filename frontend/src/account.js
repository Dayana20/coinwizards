import React, { useState, useEffect } from "react"
import NavBar from "./NavBar"
import { useParams } from "react-router-dom"
import axiosInstance from "./helpers/axios"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Select from "react-select"

function AccountSettings() {
  const {id="UserNameHere"} = useParams()
  const [userData, setUserData] = useState([{}])
  const [selectedOption, setSelectedOption] = useState(null)

  
  // console.log(id)
  let inputText = (e) => {
    console.log(e.target.value)
  }

  let deleteAccount = () => {
    if(confirm("You are now deleting your account ")){
      localStorage.setItem("stat","false")
      localStorage.setItem("username",null)
      // need to add axiosInstance
      window.location = "/"
    } else{
      console.log("Account not deleted")
    }
  }

  let saveDets = ()=> {
    console.log("saving")
    // axiosInstance.get(`/users/details/update/${id}`, {method: "PUT", 
    // headers: { "Content-Type": "application/json" }, body: JSON.stringify({})}
    // ).then(
    //   res => res.data
    // ).then(
    //   data => {
    //     // setUserData(data["Data"])
    //     console.log("updated data", data)
    //   }            
    // ). catch((error) => {
    //   console.error("Error: ", error)
    // })
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
              onChange={inputText}
              className="me-2"
              aria-label="Search"
              defaultValue={email}
            />
            Password
            <Form.Control
              type="password"
              placeholder="password"
              onChange={inputText}
              className="me-2"
              aria-label="Search"
            />
            
            <Button onClick={()=>saveDets()} variant="outline-success">Search</Button>
            <a><Button onClick={()=>deleteAccount()} variant="outline-success">Delete Account</Button></a>
            </Form>
      </div>
    </>
  )
}

export default AccountSettings