import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function UserPersonalInfo({ user }) {
	const [isEditable, setIsEditable] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	return (
		<div className="d-flex flex-column">
			<label className="fs-2">Personal Info</label>
			<Form className="mt-2">
				<Row className="mb-3">
					<Form.Group as={Col} controlId="formGridEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							disabled={isEditable}
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
					</Form.Group>

					<Form.Group as={Col} controlId="formGridPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							disabled={isEditable}
							value={password}
							onChange={(event) =>
								setPassword(event.target.value)
							}
						/>
					</Form.Group>
				</Row>

				<Form.Group className="mb-3" controlId="formGridAddress1">
					<Form.Label>Name</Form.Label>
					<Form.Control placeholder="1234 Main St" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formGridAddress2">
					<Form.Label>Address</Form.Label>
					<Form.Control placeholder="Apartment, studio, or floor" />
				</Form.Group>

				<Row className="mb-3">
					<Form.Group as={Col} controlId="formGridCity">
						<Form.Label>City</Form.Label>
						<Form.Control />
					</Form.Group>

					<Form.Group as={Col} controlId="formGridState">
						<Form.Label>State</Form.Label>
						<Form.Select defaultValue="Choose...">
							<option>Choose...</option>
							<option>...</option>
						</Form.Select>
					</Form.Group>

					<Form.Group as={Col} controlId="formGridZip">
						<Form.Label>Zip</Form.Label>
						<Form.Control />
					</Form.Group>
				</Row>

				<Form.Group className="mb-3 mt-2">
					{isEditable ? (
						<Button
							className="w-100"
							variant="primary"
							onClick={(event) => {}}
						>
							Submit
						</Button>
					) : (
						<Button
							className="w-100"
							variant="secondary"
							onClick={() => setIsEditable(true)}
						>
							Edit
						</Button>
					)}
				</Form.Group>
			</Form>
		</div>
	);
}

export default UserPersonalInfo;
