/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { getImageFromItem } from "./ItemListCommonFunction";
import {
	isInCart,
	isInComparisonList,
	isInWishlist
} from "../commonItemFunctions";
import { cartIcon, comparisonListIcon, wishlistIcon } from "../../../icons";

function GridViewItems({ items, cart, wishlist, comparisonList }) {
	const navigate = useNavigate();

	return (
		<Row xs={1} md={4} className="g-4">
			{items.map((item, idx) => {
				return (
					<Col key={idx}>
						<Card
							className={
								"cursor-pointer " +
								(parseInt(item.quantity) === 0
									? "opacity-50"
									: "")
							}
							onClick={() => navigate("items/" + item.id)}
						>
							<Card.Img
								className="p-4"
								variant="top"
								src={getImageFromItem(item.images)}
							/>
							<Card.ImgOverlay>
								<div className="d-flex">
									<div>
										{parseInt(item.quantity) === 0 && (
											<label className="fs-3 font-weight-bold">
												OUT OF STOCK
											</label>
										)}
									</div>
									<div className="ml-auto d-flex flex-column">
										{isInCart(cart, item.id) && (
											<img
												style={{ height: 25 }}
												className="mb-2"
												src={cartIcon}
											/>
										)}
										{isInComparisonList(
											comparisonList,
											item.id
										) && (
											<img
												style={{ height: 25 }}
												className="mb-2"
												src={comparisonListIcon}
											/>
										)}
										{isInWishlist(wishlist, item.id) && (
											<img
												style={{ height: 25 }}
												className="mb-2"
												src={wishlistIcon}
											/>
										)}
									</div>
								</div>
							</Card.ImgOverlay>
							<Card.Body>
								<Card.Title>{item.title}</Card.Title>
								<Card.Text>
									<label className="fs-4">
										Price:{" "}
										{item.discount && (
											<del>${item.originPrice}</del>
										)}{" "}
										${item.price}
									</label>
								</Card.Text>
							</Card.Body>
							<Card.Footer className="d-flex">
								<label className="w-50 text-center">
									Rating: {item.ratings.toFixed(2)}
								</label>
								<label className="w-50 text-center">
									Comments: {item.ratings.toFixed(2)}
								</label>
							</Card.Footer>
						</Card>
					</Col>
				);
			})}
		</Row>
	);
}

export default GridViewItems;
