import React, { useState, useEffect } from "react"
import NavBar from "./NavBar"
import { useParams } from "react-router-dom"
import axiosInstance from "./helpers/axios"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./css/post.css"
import Alert from "react-bootstrap/Alert"
import { InputTags } from "react-bootstrap-tagsinput"

function NewPost() {
    const {id="UserNameHere"} = useParams()
    const [message, setMessage] = useState(null)
    const [title, setTitle] = useState(null)
    const [tags, setTags] = useState([])
    const [content, setContent] = useState(null)
    const [error, setError] = useState(false)
    const user = localStorage.getItem("username")
    const loggedIn = localStorage.getItem("stat")

    let inputTitle = (e) => {
      setTitle(e.target.value)
    }
  
    let inputContent = (e) => {
      setContent(e.target.value)
    }

    let createPost = () => {
        let cleanedTags = tags.map(e => e.replaceAll("#", ""))
        let det = {"title": title, "content": content, "tags": cleanedTags}
        axiosInstance.post(`/users/posts/add/${user}`, det
        ).then(
          res => res.data
        ).then(
          data => {
            setMessage("New Post Created!")
            setError(false)
          }            
        ). catch((error) => {
          alert(error["response"]["data"]["message"])
          setError(true)
        })
    }
  
    return (
        <>
        <NavBar/>
        {
            message ? (<Alert variant="success">{message}</Alert>) : <></>
        }
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h2>Write a New Post</h2>
            <Form className="d-flex flex-column justify-content-center">
                <div className="form-group">
                    <label id="labels" htmlFor="title">Title</label>
                    <input id="title" className="form-control" type="text" placeholder="" onChange={inputTitle} required></input>

                    <label id="usernameLabel" htmlFor="username">Username</label>
                    <input id="username" className="form-control" type="text" defaultValue={loggedIn ? user : "Please Login to Post."} placeholder="" readOnly></input>

                    <label id="tagLabel" htmlFor="postTags">Tags (Optional)</label>
                    { tags.length < 3 ? (
                        <InputTags id="postTags" placeholder="Maximum of 3 Tags -- Add a Space to Add a Tag" values={tags} onTags={(value) => setTags(value.values.map(e => e.charAt(0) != "#" ? "#" + e.replace(/\s+/g, "") : e.replace(/\s+/g, "")))}/>) :
                        <InputTags id="postTags" values={tags} onTags={(value) => setTags(value.values)} readOnly/>
                    }

                    <label id="contentLabel" htmlFor="postContent">Content</label>
                    <textarea className="form-control" id="postContent" rows="3" onChange={inputContent} required></textarea>
                </div>
                <div className="buttonWrapper">
                    <Button id="postButton" onClick={loggedIn ? (()=>createPost()) : (alert("You are not logged in!"))} variant="outline-success">Post</Button>
                </div>
              
            </Form>
            
        </div>  
      </>
    )
}

export default NewPost