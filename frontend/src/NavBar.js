import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import "bootstrap/dist/css/bootstrap.css"
import Login from "./login" 

// used https://react-bootstrap.github.io/components/navbar/ as foundation
function NavBar() {
	if (Login()==false){
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

							<Nav>
								<Nav.Link href="#action7">Resources</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</div>
		
		)
	} else{

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
								<Nav.Link href={"/Profile/"+String("user1")}>Profile</Nav.Link>
								<NavDropdown title="Settings" id="settingsDropdown">
									<NavDropdown.Item href="#action4">Privacy</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href="#action5">Log Out</NavDropdown.Item>
								</NavDropdown>
							</Nav>

							<Nav>
								<Nav.Link href="#action7">Resources</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</div>
		
		)
	}
}

export default NavBar
