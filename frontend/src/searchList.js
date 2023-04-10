import React, { useState, useEffect } from "react"

// https://dev.to/salehmubashar/search-bar-in-react-js-545l

function UserNameList(searchBarInput){
    const [data, setData] = useState([])
	useEffect(() => {
		fetch("/users/list/names").then(
			res => res.json()
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
            {filteredUserData.map((item) => (
                <div className="d-flex flex-row flex-wrap align-items-center justify-content-evenly" style={{border: "5px solid white", height:"8vw", marginLeft:"3vh"}}>
                    <a href={"/Profile/"+item}>{item}</a>
                </div>
            ))}
        </>
    )
}


export default UserNameList