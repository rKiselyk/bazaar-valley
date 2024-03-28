import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function UserLoginModal({ show, onHide, onLogin, navigeteToRegister }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<Modal
			show={show}
			onHide={onHide}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Login
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="d-flex">
					<div className="d-flex flex-column w-50">
						<Form>
							<Form.Group className="mb-3">
								<Form.Label>Email address</Form.Label>
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
							<Form.Group className="mb-3">
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
						</Form>
						<Button
							size="lg"
							className="mt-2"
							variant="primary"
							onClick={() => onLogin(email, password)}
						>
							Login
						</Button>

						<Button
							size="lg"
							className="mt-2"
							variant="link"
							onClick={navigeteToRegister}
						>
							Register
						</Button>
					</div>
					<div className="d-flex flex-column ml-5 w-50">
						<h4>
							Unlock Exclusive Access & Perks by Registering
							Today!
						</h4>
						<p>
							Join our marketplace now and step into a world where
							convenience, exclusive deals, and a personalized
							shopping experience await you. By registering,
							you'll:
						</p>
						<p>
							- Enjoy Personalized Recommendations tailored just
							for you, making shopping faster and more enjoyable.
						</p>
						<p>
							- Earn Rewards with every purchase. The more you
							shop, the more you save!
						</p>
						<p>
							Don't miss out on making your shopping experience
							truly rewarding. Register now and be part of a
							community that values convenience, savings, and
							personalized service. Your next great find is just a
							click away!
						</p>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default UserLoginModal;
