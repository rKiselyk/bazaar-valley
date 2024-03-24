import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

const defaultImage =
	"data:image/png;base64,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";

function ItemList({ items }) {
	const navigate = useNavigate();

	function getImage(images) {
		if (!images) return defaultImage;
		if (images.length === 0) return defaultImage;

		return images[0].blob;
	}

	return (
		<Row xs={1} md={4} className="g-4">
			{items.map((item, idx) => {
				return (
					<Col key={idx}>
						<Card
							className="cursor-pointer"
							onClick={() => navigate("items/" + item.id)}
						>
							<Card.Img
								variant="top"
								src={getImage(item.images)}
							/>
							<Card.Body>
								<Card.Title>{item.title}</Card.Title>
								<Card.Text>
									<label className="fs-4">
										Price: ${item.price}
									</label>
								</Card.Text>
							</Card.Body>
							<Card.Footer>
								<small className="text-muted">
									/* TODO Ratings: 4.5* Comments: 15 */
								</small>
							</Card.Footer>
						</Card>
					</Col>
				);
			})}
		</Row>
	);
}

export default ItemList;
