import React from "react"
import {Container, Row, Col, Form, Button} from "react-bootstrap"
import "../../css/home.css"


const Search = () => {
	return (
		<div id="searchBar">
		<Container className='mt-5'>
			<Row className='justify-content-center'>
				<Col xs={12} md={8}>
					<Form action="/Search/">
						<Row>
							<Col xs={9}>
								<Form.Control
									type= "text"
									placeholder="Search..."
								/>
							</Col>
							<Col>
								<Button type="submit" variant="dark"><a href="/Search/" style={{textDecoration: "none"}}>Search</a></Button>{" "}
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
		</Container></div>

	)
}

export default Search