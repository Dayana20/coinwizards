import React, { useState, useEffect } from "react"
import axiosInstance from "./helpers/axios"

// https://dev.to/salehmubashar/search-bar-in-react-js-545l

function UserNameList(searchBarInput){
    const [data, setData] = useState([])
	useEffect(() => {
		axiosInstance.get("/users/list/names").then(
			res => res.data
		).then(
			data => {
				setData(data)
			}            
		). catch((error) => {
			console.error("Error: ", error)
		})
	}, [])
    const filteredUserData = data.filter((names) => {
        // return all names if nothing specific is searched
        if (searchBarInput.input === "") {
            return names
        }
        else {
            return names.includes(searchBarInput.input)   
        }
    })
    return(
        <>
            {(filteredUserData.length == 0)? (
                <h5>No Users Found</h5>
            ) : (
                filteredUserData.map((item) => (
                    <div key={item} className="d-flex flex-row flex-wrap align-items-center justify-content-evenly" style={{height:"8vw", marginLeft:"3vh"}}>
                        <a id="userItem" href={"/Profile/"+item}>{item}</a>
                    </div>
                ))
            )}
        </>
    )
}


export default UserNameList