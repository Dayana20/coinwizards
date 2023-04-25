import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import "bootstrap/dist/css/bootstrap.css"
// import {login_STATUS} from "./login"

// console.log("here! nav!", login_STATUS)
function logout(){
    localStorage.setItem("stat","false")
    localStorage.setItem("username",null)
}

// used https://react-bootstrap.github.io/components/navbar/ as foundation
function NavBar() {
	let status = localStorage.getItem("stat")
	console.log("status is", status)
	if (status == "null" || status=="false"){
		return (
			<div id="homestyle">
				<Navbar bg="light" expand="lg">
					<Container fluid>
						<Navbar.Brand href="/">CoinWizards</Navbar.Brand>
						<Navbar.Toggle aria-controls="navbarScroll" />
						<Navbar.Collapse id="navbarScroll">
							<Nav
								className="me-auto my-2 my-lg-0"
								style={{ maxHeight: "100px" }}
								navbarScroll
							>
							
							
								{/* <NavDropdown title="Settings" id="settingsDropdown">
									<NavDropdown.Item href="#action4">Privacy</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href="#action5">Log Out</NavDropdown.Item>
								</NavDropdown> */}
							</Nav>
							<Nav><Nav.Link href="/login">Login</Nav.Link></Nav>
							

							<Nav>
								<Nav.Link href="/resources">Resources</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</div>
		
		)
	} else{
		let user = localStorage.getItem("username")
		return (
			<div id="homestyle">
				<Navbar bg="light" expand="lg">
					<Container fluid>
						<Navbar.Brand href="/">CoinWizards</Navbar.Brand>
						<Navbar.Toggle aria-controls="navbarScroll" />
						<Navbar.Collapse id="navbarScroll">
							<Nav
								className="me-auto my-2 my-lg-0"
								style={{ maxHeight: "100px" }}
								navbarScroll
							>
								<Nav.Link href="/">Home</Nav.Link>
								<Nav.Link href={"/Profile/"+user}>Profile</Nav.Link>
								<NavDropdown title="Settings" id="settingsDropdown">
									<NavDropdown.Item href={"/Account/"+user}>Account</NavDropdown.Item>
									<NavDropdown.Item href={"/Privacy/"+user}>Privacy</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href="/login"><button onClick={logout}>Log Out!</button></NavDropdown.Item>
								</NavDropdown>
							</Nav>

							<Nav>
								<Nav.Link href="/resources">Resources</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</div>
		
		)
	}
}

export default NavBar
