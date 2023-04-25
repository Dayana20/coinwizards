import React, { useState, useEffect } from "react"
import axiosInstance from "./helpers/axios"
import NavBar from "./NavBar"
import { useParams } from "react-router-dom"
import "./css/profile.css"
import blank_profile from "./assets/blank_profile.jpg"
import Alert from "react-bootstrap/Alert"

import moment from "moment"
import { Button, Modal } from "react-bootstrap"

function ProfileP() {
    const {id="UserNameHere"} = useParams()

    const [loading, setLoading] = useState(true)
    const [followerData, setFData] = useState([{}])
    const [followingData, setFGData] = useState([{}])
    const [coinData, setCoinData] = useState([{}])
    const [validUser, setValidUser] = useState([{}])
    const [postData, setPostData] = useState([{}])
    const [show, setShow] = useState(false)
    const [postIdDelete, setPostIdDelete] = useState("")

    const loggedIn = localStorage.getItem("stat")
    const loggedUser = localStorage.getItem("username")
    // const user = localStorage.getItem("username")

    const [followingUsers, setFollowingUsers] = useState([])
    const [followersUsers, setFollowersUsers] = useState([])
    const [followingStatus, setFollowStatus] = useState(null)
    const [message, setMessage] = useState(null)
    const [followerLen, setfollowerLen] = useState(0)

    const handleClose = () => {
        setShow(false)
    }

    const handleClickDelete = (postId) => {
        setShow(true)
        setPostIdDelete(postId)
        console.log("deleting", postId)
    }

    const handleConfirmDelete = () => {
        axiosInstance.delete(`/users/posts/${id}/${postIdDelete}`).then(
            res => res.data
        ).then(
            data => {
                setPostData(data["posts"].reverse())
            }
        ).catch((error) => {
            console.log(error)
		})
        setShow(false)
    }

    useEffect(() => {
		axiosInstance.get(`/users/details/${id}`).then(
			res => res.data
		).then(
			data => {
                console.log(data["Data"][id]["Name"]["posts"])
				setFData(data["Data"][id]["Name"]["Followers"])
                setFGData(data["Data"][id]["Name"]["Following"])
                setCoinData(data["Data"][id]["Name"]["coins"])
                setFollowingUsers(data["Data"][id]["Name"]["Following"])
                console.log(data["Data"][id]["Name"]["Followers"], data["Data"][id]["Name"]["Followers"].length)
                setfollowerLen(data["Data"][id]["Name"]["Followers"].length)
                setFollowersUsers(data["Data"][id]["Name"]["Followers"])
                setPostData(data["Data"][id]["Name"]["posts"].reverse())
                setValidUser(true)
                setLoading(false)
                console.log(coinData)
                console.log(followerData)
			}            
		). catch((error) => {
			setValidUser(false)
            setLoading(false)
		})
	}, [])

    useEffect(() => {
        document.body.className = "profile-body"
    }, [])

    let UserFollow =(user1,user2) =>{
        axiosInstance.post("/users/follow/"+user1+"/"+user2).then(
            res => res.data
        ).then(
            data => {
                console.log("Following data", data)
                setMessage("Followed " + user2)
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
                setMessage("Unfollowed " + user2)
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
        axiosInstance.get("/users/followings/"+loggedUser).then(
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

    if(followingStatus==null && loggedIn!="false"){
        const exist = followingUserStatus(loggedUser,id)
    }
    console.log("stat", followerData)
 
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove this post?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirmDelete}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>
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
                            {(loggedUser!=id && loggedIn!="false" && followingStatus == false)? <button onClick={()=>UserFollow(loggedUser,id)}> Follow </button>
                            :(loggedUser!=id && loggedIn!="false" && followingStatus == true) ? <button onClick={()=>unfollowUser(loggedUser,id)}> Unfollow </button>
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
                                <br/>
                                <br/>
                                <br/>
                                {loggedIn && id==loggedUser ? (
                                    <a href={"/Profile/post"} className="btn btn-secondary" title="Coming Soon">
                                        New Post
                                    </a>
                                ) : null}
                            </div> 
                        </div>
                        <div id="coinsDiv">
                            <div id="coinHeader">Coins Tracked</div>
                            <ul id="coinGroup" className="list-group list-group-flush">
                                {coinData.length > 0 ? (coinData.map(coin => (
                                    <a key={coin} href={"/Coin/" + coin} className="list-group-item list-group-item-action" id="coinItem">{coin}</a>
                                ))) : (
                                    <div id="noneHeader">No coins tracked!</div>
                                )}
                            </ul>
                        </div>
                        <div id="postsCol">
                            <div id="coinHeader">Posts</div>
                            <ul id="postsGroup" className="list-group list-group-flush overflow-auto">
                                    {postData.length > 0 ? (postData.map(u_post => (
                                        <div key={u_post.title} class="list-group-item list-group-item-action rounded-bottom" id="postItem">
                                            <span id="postTitle">{u_post.title}</span>
                                            <Button id="deleteButton" className="btn btn-secondary" onClick={() => handleClickDelete(u_post.post_id)}>
                                                <span>&times;</span>
                                            </Button>
                                            <br/>
                                            {u_post.tags.length > 0 ? (
                                                <>
                                                    <span id="profilePostTags">
                                                        {(u_post.tags.map(tag => (
                                                            <a>#{tag}&nbsp;</a>
                                                        )))}
                                                    </span>
                                                    <br/>
                                                </>
                                            ) : null}
                                            <span id="postTimestamp" title={moment.utc(u_post.timestamp).format()}>{moment(u_post.timestamp + "Z").fromNow()}</span>
                                            <br/>
                                            <br/>
                                            <p>
                                                {u_post.content}
                                            </p>
                                        </div>
                                    ))) : (
                                        <h1 id="noneHeader">None!</h1>
                                    )}
                                    
                                </ul>
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
    )
}

export default ProfileP