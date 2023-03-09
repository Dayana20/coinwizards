import React from "react"
import {Container, Row, Col, Form, Button} from "react-bootstrap"
import "../../css/home.css"


const Search = () => {
	return (
		<div id="searchBar">
		<Container className='mt-5'>
			<Row className='justify-content-center'>
				<Col xs={12} md={8}>
					<Form>
						<Row>
							<Col xs={9}>
								<Form.Control
									type= "text"
									placeholder="Search..."
								/>
							</Col>
							<Col>
								<Button type="submit" variant="dark">Search</Button>{" "}
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
		</Container></div>

	)
}

export default Search