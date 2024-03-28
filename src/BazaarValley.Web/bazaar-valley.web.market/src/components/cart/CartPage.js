import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as cartActions from "../../redux/actions/cartActions";
import Loader from "../common/Loader";

import Button from "react-bootstrap/Button";

import "./CartPage.css";
import { NavLink, useNavigate } from "react-router-dom";

function CartPage({ cart, loading, actions }) {
	const navigate = useNavigate();

	if (!cart)
		return (
			<div className="d-flex align-items-center justify-content-center">
				<Loader />
			</div>
		);

	return (
		<div className="d-flex w-100">
			<div className="d-flex flex-column p-5 bg-white with-border w-75">
				<div className="d-flex">
					<label className="fs-2">Shopping Cart</label>
					<label className="ml-auto fs-2">{cart.length} Items</label>
				</div>
				<div className="d-flex mt-5 flex-column cart">
					<div class="cart-item fs-5">
						<div class="product-details">PRODUCT DETAILS</div>
						<div class="quantity-control">QUANTITY</div>
						<div class="price">PRICE</div>
						<div class="total">TOTAL</div>
					</div>
					{cart.map((item) => {
						return (
							<div class="cart-item fs-3">
								<div class="product-details">
									<img
										src={item.image}
										alt="Fifa 19"
										class="product-image"
									/>
									<div class="product-info">
										<label
											className="fs-3 cursor-pointer"
											onClick={() =>
												navigate(
													`/category/${item.categoryId}/items/${item.id}`
												)
											}
										>
											{item.title}
										</label>
									</div>
								</div>
								<div class="quantity-control">
									<button
										class="quantity-btn"
										onClick={() =>
											actions.decreaseQuantity(item.id, 1)
										}
									>
										-
									</button>
									<span class="quantity">
										{item.quantity}
									</span>
									<button
										class="quantity-btn"
										onClick={() =>
											actions.increaseQuantity(item.id, 1)
										}
									>
										+
									</button>
								</div>
								<div class="price">{item.price}</div>
								<div class="total">
									{item.price * item.quantity}
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="ml-auto p-5 w-25 d-flex flex-column bg-white with-border">
				<label className="fs-2">Order Summary</label>
				<div className="d-flex mt-5">
					<label className="fs-4">Items {cart.length}</label>
					<label className="ml-auto fs-4">
						$
						{cart.reduce((accumulator, item) => {
							return accumulator + item.quantity * item.price;
						}, 0)}
					</label>
				</div>
				<Button className="mt-5" variant="primary" size="lg">
					CHECOUT
				</Button>
			</div>
		</div>
	);
}

CartPage.propTypes = {
	cart: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		cart: state.cart,
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
			increaseQuantity: bindActionCreators(
				cartActions.increaseQuantity,
				dispatch
			),
			decreaseQuantity: bindActionCreators(
				cartActions.decreaseQuantity,
				dispatch
			)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
