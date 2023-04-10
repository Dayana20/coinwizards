import NavBar from "./NavBar"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./css/profile.css"
import blank_profile from "./assets/blank_profile.jpg"

function ProfileP() {
    const {id="UserNameHere"} = useParams()

    const [loading, setLoading] = useState(true)
    const [followerData, setFData] = useState([{}])
    const [followingData, setFGData] = useState([{}])
    const [coinData, setCoinData] = useState([{}])
    const [validUser, setValidUser] = useState([{}])

    useEffect(() => {
		fetch(`/users/details/${id}`).then(
			res => res.json()
		).then(
			data => {
				setFData(data["Data"][id]["Name"]["Followers"])
                setFGData(data["Data"][id]["Name"]["Following"])
                setCoinData(data["Data"][id]["Name"]["coins"])
                setValidUser(true)
                setLoading(false)
			}            
		). catch((error) => {
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
                        <div id="pictureCol">
                            <img id="pictureCircle" className="rounded-circle" src={blank_profile}/>
                            <div id="nameHeader">{id}</div> 
                            <div id="followHeader">
                                {coinData.length} Coins Tracked
                                <br/>
                                <br/>
                                {followerData.length} <a id="followRef" href={"/Profile/"+id+"/followers"}>Followers</a>
                                <br/>
                                {followingData.length} <a id="followRef" href={"/Profile/"+id+"/following"}>Following</a>
                            </div> 
                        </div>
                        <div id="coinsDiv">
                            <div id="coinHeader">Coins Tracked</div>
                            <ul id="coinGroup" className="list-group list-group-flush">
                                {coinData.length > 0 ? (coinData.map(coin => (
                                    <a href={"/Coin/" + coin} class="list-group-item list-group-item-action" id="coinItem">{coin}</a>
                                ))) : (
                                    <h1 id="noneHeader">None!</h1>
                                )}
                                
                            </ul>
                        </div>
                        <div id="postsCol">

                        </div>

                        <div id="placeholderCol">

                        </div>
                        
                        <div id="placeholderCol2">

                        </div>
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