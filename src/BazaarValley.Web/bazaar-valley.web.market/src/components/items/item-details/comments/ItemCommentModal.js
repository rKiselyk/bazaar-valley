import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import RangeInput from "../../../common/RangeInput";

function ItemCommentModal(props) {
	const [content, setContent] = useState("");
	const [rating, setReiting] = useState(5.0);

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Comment and Review
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group
						className="mb-3"
						controlId="exampleForm.ControlTextarea1"
					>
						<Form.Label>
							Selected reiting for this product:{" "}
							<label className="font-weight-bold">{rating}</label>
						</Form.Label>
						<RangeInput
							value={rating}
							min={0}
							max={10}
							setValue={(value) => setReiting(Number(value))}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formGridAddress1">
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1"
						>
							<Form.Label>Enter comment bellow</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								value={content}
								onChange={(event) => {
									setContent(event.target.value);
								}}
							/>
						</Form.Group>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="w-100"
					size="lg"
					variant="primary"
					type="submit"
					disabled={!content}
					onClick={() => {
						props.onComment(content, rating);
						setContent("");
						setReiting(5.0);
					}}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ItemCommentModal;
