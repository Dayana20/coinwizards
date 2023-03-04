import NavBar from "./NavBar"
import React from "react"
import { useParams } from "react-router-dom"



function ProfileP(){
    const {id="UserNameHere"} = useParams()
    console.log(id)
    return(
        <div>
            <NavBar/>
            <h2>Hi {id} !</h2>
        </div>
    )
}

export default ProfileP