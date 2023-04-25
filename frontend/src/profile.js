import React, { useState, useEffect } from "react"
import axiosInstance from "./helpers/axios"
import NavBar from "./NavBar"
import { useParams } from "react-router-dom"
import "./css/profile.css"
import blank_profile from "./assets/blank_profile.jpg"
import Alert from "react-bootstrap/Alert"


function ProfileP() {
    const {id="UserNameHere"} = useParams()

    const [loading, setLoading] = useState(true)
    const [followerData, setFData] = useState([{}])
    const [followingData, setFGData] = useState([{}])
    const [coinData, setCoinData] = useState([{}])
    const [validUser, setValidUser] = useState([{}])
    const [followingUsers, setFollowingUsers] = useState([])
    const [followersUsers, setFollowersUsers] = useState([])
    const [followingStatus, setFollowStatus] = useState(null)
    const [message, setMessage] = useState(null)
    const [followerLen, setfollowerLen] = useState(0)



    useEffect(() => {
		axiosInstance.get(`/users/details/${id}`).then(
			res => res.data
		).then(
			data => {
				setFData(data["Data"][id]["Name"]["Followers"])
                setFGData(data["Data"][id]["Name"]["Following"])
                setCoinData(data["Data"][id]["Name"]["coins"])
                setFollowingUsers(data["Data"][id]["Name"]["Following"])
                console.log(data["Data"][id]["Name"]["Followers"], data["Data"][id]["Name"]["Followers"].length)
                setfollowerLen(data["Data"][id]["Name"]["Followers"].length)
                setFollowersUsers(data["Data"][id]["Name"]["Followers"])
                setValidUser(true)
                setLoading(false)
			}            
		). catch((error) => {
			setValidUser(false)
            setLoading(false)
		})
	}, [])

    // let updateDets = () => {
    //     axiosInstance.get(`/users/followers/${id}`).then(
	// 		res => res.data
	// 	).then(
	// 		data => {
	// 			// setFData(data)
	// 			setFData(data["Data"][id]["Name"]["followers"])
    //             // setFGData(data["Data"][user]["Name"]["Following"])
    //             console.log("updating!", data["Data"][id]["followers"])

	// 		}            
	// 	). catch((error) => {
	// 		setValidUser(false)
    //         setLoading(false)
	// 	})
    //     console.log(followerData)
    // }

    let UserFollow =(user1,user2) =>{
        axiosInstance.post("/users/follow/"+user1+"/"+user2).then(
            res => res.data
        ).then(
            data => {
                console.log("Following data", data)
                setMessage("Following User")
                if(!Object.keys(data).includes("message")){
                    setFollowStatus(true)
                    setfollowerLen(followerLen+1)

                }
            }        
        ). catch((error) => {
            console.error("Error: ", error)
        })
        // console.log(user1,"following",user2, followerLen)
    }

    let unfollowUser =(user1,user2) =>{
        axiosInstance.delete("/users/remove/follow/"+user1+"/"+user2).then(
            res => res.data
        ).then(
            data => {
                // console.log("Following data", data)
                setMessage("Following User")
                if(!Object.keys(data).includes("message")){
                    setFollowStatus(false)
                    setfollowerLen(followerLen-1)
                }
            }            
        ). catch((error) => {
            console.error("Error: ", error)
        })
        // console.log(user1,"unfollowing",user2, followerLen)
    }

    let followingUserStatus =(user1,user2) =>{
        // checking to see if account follows user on page
        axiosInstance.get("/users/followings/"+user).then(
            res => res.data
        ).then(
            data => {
                console.log("following data ", data["Data"][user1]["followings"], data["Data"][user1]["followings"].includes(user2))
                if(!Object.keys(data).includes("message")){
                    setFollowStatus(data["Data"][user1]["followings"])
                    if(data["Data"][user1]["followings"].includes(user2)){
                        // already follows
                        setFollowStatus(true)
                    } else{
                        setFollowStatus(false)
                    }
                }
                
            }            
        ). catch((error) => {
            console.error("Error: ", error)
        })
    }
    const user = localStorage.getItem("username")
    const loggedIn = localStorage.getItem("stat")
    if(followingStatus==null && loggedIn!="false"){
        const exist = followingUserStatus(user,id)
    }
    console.log("stat", followerData)
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
                    {(message==null)? <div></div>
                    :<Alert key="danger" variant="success">{message}!</Alert>
                    }
                    <div className="container-fluid">
                        <div id="pictureCol">
                            <img id="pictureCircle" className="rounded-circle" src={blank_profile}/>
                            <div id="nameHeader">{id}</div> 
                            {(user!=id && loggedIn!="false" && followingStatus == false)? <button onClick={()=>UserFollow(user,id)}> Follow </button>
                            :(user!=id && loggedIn!="false" && followingStatus == true) ? <button onClick={()=>unfollowUser(user,id)}> Unfollow </button>
                            : (
                                <div>H</div>
                                // <button onClick={()=>CoinFollow(user,coinData["name"])}> Follow </button>
                            )}
                            <div id="followHeader">
                                {coinData.length} Coins Tracked
                                <br/>
                                <br/>
                                {followerLen} <a id="followRef" href={"/Profile/"+id+"/followers"}>Followers</a>
                                <br/>
                                {followingData.length} <a id="followRef" href={"/Profile/"+id+"/following"}>Following</a>
                            </div> 
                        </div>
                        <div id="coinsDiv">
                            <div id="coinHeader">Coins Tracked</div>
                            <ul id="coinGroup" className="list-group list-group-flush">
                                {coinData.length > 0 ? (coinData.map(coin => (
                                    <a key={coin} href={"/Coin/" + coin} class="list-group-item list-group-item-action" id="coinItem">{coin}</a>
                                ))) : (
                                    <h1 id="noneHeader">None!</h1>
                                )}
                                
                            </ul>
                        </div>
                        <div id="postsCol">
                            <div id="followingHeader">Following</div>
                                <ul id="followingGroup" className="list-group list-group-flush">
                                    {followersUsers.length > 0 ? (followersUsers.map(user => (
                                        <a key={user} href={"/Profile/" + user} className="list-group-item list-group-item-action" id="followingItem">{user}</a>
                                    ))
                                    ) : (
                                    <h1 id="noneHeader">No followers</h1>
                                    )}
                                </ul>
                            </div>
                        </div>

                        <div id="placeholderCol">
                            <div id="followingHeader">Following</div>
                                <ul id="followingGroup" className="list-group list-group-flush">
                                    {followingUsers.length > 0 ? (followingUsers.map(user => (
                                        <a key={user} href={"/Profile/" + user} className="list-group-item list-group-item-action" id="followingItem">{user}</a>
                                    ))
                                    ) : (
                                    <h1 id="noneHeader">Not following anyone!</h1>
                                    )}
                                </ul>
                            </div>
                        
                        <div id="placeholderCol2">
                            
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

        //     <div className="card dflex"
        //     style={{maxHeight: "20rem", maxWidth: "40rem",
        //             marginTop: "-10rem", alignItems: "center",
        //             marginLeft: "25rem", height:"15rem",
        //             justifyContent: "center", display: "flex", textAlign: "center"}}>
        //         <div className="card-body dflex text-align-center"  style={{width : "15rem"}}>
        //             <h6><u>FOLLOWERS ({followerData.length})</u></h6>
        //             <p className="text-align-center"> 
        //                 {followerData.map(e => typeof e == "string"?<div>{e}</div> : "")}
        //             </p>
        //             <h6><u>FOLLOWING ({followingData.length})</u></h6>
        //             <p className="text-align-center">
        //                 {followingData.map(e => typeof e == "string"?<div>{e}</div> : "")}
        //             </p>
        //             <h6><u>COINS</u></h6>
        //             <p className="text-align-center">
        //                 {coinData.map(e => typeof e == "string"?<div>{e}</div> : "")}
        //             </p>
        //         </div>
        //     </div>

        //     <div className="card dflex"
        //     style={{maxHeight: "10rem", maxWidth: "40rem",
        //             marginTop: "10rem", alignItems: "center",
        //             marginLeft: "25rem", height:"10rem",
        //             justifyContent: "center", display: "flex", textAlign: "center"}}>
        //         <div className="card-body dflex text-align-center"  style={{width : "15rem"}}>
        //             <p className="text-align-center">No posts to show!</p>
        //         </div>
        //     </div>


        // </>

    )
}

export default ProfileP