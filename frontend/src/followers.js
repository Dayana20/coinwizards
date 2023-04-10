import NavBar from "./NavBar"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./css/follow.css"

function FollowersP() {
    const {id="UserNameHere"} = useParams()

    const [loading, setLoading] = useState(true)
    const [followerData, setFData] = useState([{}])
    const [validUser, setValidUser] = useState([{}])

    useEffect(() => {
		fetch(`/users/followers/${id}`).then(
			res => res.json()
		).then(
			data => {
				setFData(data["Data"][id]["followers"])
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
                    <div id="pageTemp" className="container-fluid">
                        <h1 id="headerTemp">{id + "'s Followers"}</h1>
                        <p id="listTemp" className="text-align-center"> 
                            {followerData.map(e => typeof e == "string"?<a id="itemTemp" href={"/Profile/"+e}>{e}</a> : "")}
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

export default FollowersP