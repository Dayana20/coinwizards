import React, { useState, useEffect } from "react"
import NavBar from "./NavBar"
import { useParams } from "react-router-dom"
import axiosInstance from "./helpers/axios"


function AccountSettings() {
    const {id="UserNameHere"} = useParams()
    const [userData, setUserData] = useState([{}])
    
    console.log(id)
    useEffect(() => {
		axiosInstance.get(`/users/details/${id}`).then(
			res => res.data
		).then(
			data => {
                setUserData(data)
                console.log(data["Data"])
			}            
		). catch((error) => {
			console.error("Error: ", error)
		})
	}, [])
    return (
        <>
        <NavBar/>
        <div className="d-flex justify-content-center align-items-center" style={{height:"50vh"}}>
            <h2>Welcome {}</h2>
        </div>
      </>
    )
  }
  
  export default AccountSettings