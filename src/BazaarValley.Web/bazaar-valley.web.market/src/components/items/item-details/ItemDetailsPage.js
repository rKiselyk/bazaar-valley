import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../../redux/actions/categoryActions";
import * as cartActions from "../../../redux/actions/cartActions";
import * as comparisonListActions from "../../../redux/actions/comparisonListActions";
import * as wishlistActions from "../../../redux/actions/wishlistActions";

import { NavLink } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Loader from "../../common/Loader";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {
	isInCart,
	isInComparisonList,
	isInWishlist
} from "../commonItemFunctions";
import ItemComments from "./comments/ItemComments";

function ItemDetailsPage({
	user,
	categories,
	cart,
	wishlist,
	comparisonList,
	loading,
	actions
}) {
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

	const { data: itemInfo, loading: loadingItemInfo } = useFetch(
		`/Items/${itemId}`
	);

	const {
		data: comments,
		setData: setComments,
		loading: loadingComments
	} = useFetch(`/items/${itemId}/comments`);

	if (!itemInfo || !category)
		return (
			<div className="d-flex align-items-center justify-content-center">
				<Loader />
			</div>
		);

	return (
		<div className="d-flex flex-column">
			<div className="d-flex">
				<Breadcrumb>
					<Breadcrumb.Item>
						<NavLink className="px-3" to="/">
							HOME
						</NavLink>
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<NavLink
							className="px-3"
							to={"/category/" + categoryId}
						>
							{category.name}
						</NavLink>
					</Breadcrumb.Item>
					<Breadcrumb.Item active>
						<label className="px-3">{itemInfo.title}</label>
					</Breadcrumb.Item>
				</Breadcrumb>
			</div>
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
					<label className="mt-2 fs-2">
						Price: ${itemInfo.price}
					</label>
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

					{isInCart(cart, itemInfo.id) ? (
						<Button
							variant="success"
							size="lg"
							onClick={() =>
								actions.removeFromCart({
									id: itemInfo.id,
									categoryId: parseInt(categoryId)
								})
							}
						>
							Remove from Cart
						</Button>
					) : (
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
					)}
					{isInComparisonList(comparisonList, itemInfo.id) ? (
						<Button
							className="mt-2"
							variant="secondary"
							size="lg"
							onClick={() =>
								actions.removeFromComparisonList({
									id: itemInfo.id,
									categoryId: parseInt(categoryId)
								})
							}
						>
							Remove From Comparison List
						</Button>
					) : (
						<Button
							className="mt-2"
							variant="light"
							size="lg"
							onClick={() =>
								actions.addToComparisonList({
									id: itemInfo.id,
									categoryId: parseInt(categoryId),
									image: itemInfo.images[0]?.blob,
									title: itemInfo.title,
									price: itemInfo.price,
									fields: itemInfo.fields
								})
							}
						>
							Add To Comparison List
						</Button>
					)}
					{isInWishlist(wishlist, itemInfo.id) ? (
						<Button
							className="mt-2"
							variant="secondary"
							size="lg"
							onClick={() => {
								actions.removeFromWishlist(
									user.id,
									itemInfo.id
								);
							}}
						>
							Remove From Wishlist
						</Button>
					) : (
						<Button
							className="mt-2"
							variant="light"
							size="lg"
							onClick={() => {
								actions.addToWishlist(user.id, itemInfo.id);
							}}
						>
							Add To Wishlist
						</Button>
					)}
				</div>
			</div>

			<div className="with-border bg-white p-5">
				<ItemComments
					itemId={itemId}
					comments={comments}
					addComment={(content, rating) => {
						setComments([
							...comments,
							{ content, createdAt: new Date(), user, rating }
						]);
					}}
				/>
			</div>
		</div>
	);
}

ItemDetailsPage.propTypes = {
	categories: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		categories: state.categories,
		user: state.user,
		cart: state.cart,
		wishlist: state.wishlist,
		comparisonList: state.comparisonList,
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
			addToCart: bindActionCreators(cartActions.addToCart, dispatch),
			removeFromCart: bindActionCreators(
				cartActions.removeFromCart,
				dispatch
			),
			addToComparisonList: bindActionCreators(
				comparisonListActions.addToComparisonList,
				dispatch
			),
			removeFromComparisonList: bindActionCreators(
				comparisonListActions.removeFromComparisonList,
				dispatch
			),
			addToWishlist: bindActionCreators(
				wishlistActions.addItem,
				dispatch
			),
			removeFromWishlist: bindActionCreators(
				wishlistActions.deleteItem,
				dispatch
			)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailsPage);
