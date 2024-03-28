import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../../redux/actions/categoryActions";
import * as cartActions from "../../../redux/actions/cartActions";

import Carousel from "react-bootstrap/Carousel";
import Loader from "../../common/Loader";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function ItemDetailsPage({ categories, loading, actions }) {
	const { categoryId, itemId } = useParams();
	const [category, setCategory] = useState({});

	useEffect(() => {
		if (categories.length === 0) {
			actions.loadCategories().catch((error) => {
				alert("Loading courses failed" + error);
			});
		}

		const selectedCategory = categories.find(
			(category) => category.id === parseInt(categoryId)
		);

		setCategory(selectedCategory);
	}, []);

	const {
		data: itemInfo,
		error,
		loading: loadingItemInfo
	} = useFetch(`/Items/${itemId}`);

	if (!itemInfo || !category)
		return (
			<div className="d-flex align-items-center justify-content-center">
				<Loader />
			</div>
		);

	return (
		<div className="d-flex">
			<div className="d-flex flex-column with-border w-50 bg-white p-5">
				<Carousel data-bs-theme="dark">
					{itemInfo.images.map((image) => {
						return (
							<Carousel.Item key={image.id}>
								<img
									className="d-block w-100"
									src={image.blob}
									alt="Second slide"
								/>
							</Carousel.Item>
						);
					})}
				</Carousel>
			</div>
			<div className="d-flex flex-column with-border w-50 bg-white p-5">
				<label className="fs-1">{itemInfo.title}</label>
				<label className="mt-2 fs-2">Price: ${itemInfo.price}</label>
				<label className="mt-2 fs-4">{itemInfo.description}</label>
				<div className="d-flex mt-2 flex-column">
					<label className="fs-3">Сharacteristics</label>
					<Table striped bordered hover>
						<tbody>
							{category.fields.map((field) => {
								return (
									<tr key={field.id}>
										<td>{field.name}</td>
										<td>
											{itemInfo.fields.find(
												(itemField) =>
													itemField.categoryFieldId ===
													field.id
											)?.value || "-"}
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</div>

				<Button
					variant="primary"
					size="lg"
					onClick={() =>
						actions.addToCart({
							id: itemInfo.id,
							categoryId: parseInt(categoryId),
							image: itemInfo.images[0].blob,
							title: itemInfo.title,
							quantity: 1,
							price: itemInfo.price
						})
					}
				>
					Add To Cart
				</Button>
			</div>
		</div>
	);
}

ItemDetailsPage.propTypes = {
	categories: PropTypes.array.isRequired,
	items: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		categories: state.categories,
		loading: state.apiCallsInProgress > 0
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			loadCategories: bindActionCreators(
				categoryActions.loadCategories,
				dispatch
			),
			addToCart: bindActionCreators(cartActions.addToCart, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailsPage);
