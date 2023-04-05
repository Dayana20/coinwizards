import NavBar from "./NavBar"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./css/profile.css"

function FollowingP() {
    const {id="UserNameHere"} = useParams()

    const [loading, setLoading] = useState(true)
    const [followingData, setFData] = useState([{}])
    const [validUser, setValidUser] = useState([{}])

    useEffect(() => {
		fetch(`/users/followings/${id}`).then(
			res => res.json()
		).then(
			data => {
				setFData(data["Data"][id]["followings"])
                setValidUser(true)
                setLoading(false)
			}            
		). catch((error) => {
            console.log(error)
			setValidUser(false)
            setLoading(false)
		})
	}, [])

    return (
        <>
            {loading ? (
                <div id="profilePage">
                    <NavBar/>
                    LOADING...
                </div>
            ) : validUser ? (
                <div id="profilePage">
                    <NavBar/>
                    <div className="container-fluid">
                        <p className="text-align-center"> 
                            {followingData.map(e => typeof e == "string"?<div>{e}</div> : "")}
                        </p>
                    </div>
                </div>
                ) : (
                <div id="profilePage">
                    <NavBar/>
                    <div className="container-fluid" id="errorProfile">
                        User not found!
                    </div>
                </div>
            )}
        </>
    )
}

export default FollowingP