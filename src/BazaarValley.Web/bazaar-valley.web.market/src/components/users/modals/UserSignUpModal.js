import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function UserSignUpModal(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Sign Up
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3" controlId="formGridAddress1">
						<Form.Label>Full Name</Form.Label>
						<Form.Control
							size="lg"
							placeholder="Full Name"
							value={name}
							onChange={(event) => {
								setName(event.target.value);
							}}
						/>
					</Form.Group>

					<Row className="mb-3">
						<Form.Group as={Col} controlId="formGridEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control
								size="lg"
								type="email"
								placeholder="name@example.com"
								autoFocus
								value={email}
								onChange={(event) =>
									setEmail(event.target.value)
								}
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								size="lg"
								type="password"
								placeholder="Password"
								value={password}
								onChange={(event) =>
									setPassword(event.target.value)
								}
							/>
						</Form.Group>
					</Row>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="w-100"
					size="lg"
					variant="primary"
					type="submit"
					onClick={() => props.onRegister(email, password, name)}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default UserSignUpModal;
