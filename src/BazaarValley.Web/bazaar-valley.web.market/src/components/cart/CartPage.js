import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as cartActions from "../../redux/actions/cartActions";
import Loader from "../common/Loader";

import Button from "react-bootstrap/Button";

import "./CartPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import SuccessBuyModal from "./modals/SuccessBuyModal";

function CartPage({ cart, user, actions }) {
	const navigate = useNavigate();

	const [successBuyModalShow, setSuccessBuyModalShow] = useState(false);
	const [check, setCheck] = useState(null);

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
					<div className="cart-item fs-5">
						<div className="product-details">PRODUCT DETAILS</div>
						<div className="quantity-control">QUANTITY</div>
						<div className="price">PRICE</div>
						<div className="total">TOTAL</div>
					</div>
					{cart.map((item) => {
						return (
							<div key={item.id} className="cart-item fs-3">
								<div className="product-details">
									<img
										src={item.image}
										alt="Fifa 19"
										className="product-image"
									/>
									<div className="product-info">
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
								<div className="quantity-control">
									<button
										className="quantity-btn"
										onClick={() =>
											actions.decreaseQuantity(item.id, 1)
										}
									>
										-
									</button>
									<span className="quantity">
										{item.quantity}
									</span>
									<button
										className="quantity-btn"
										onClick={() =>
											actions.increaseQuantity(item.id, 1)
										}
									>
										+
									</button>
								</div>
								<div className="price">{item.price}</div>
								<div className="total">
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
				<Button
					className="mt-5"
					variant="primary"
					size="lg"
					disabled={cart.length === 0}
					onClick={() =>
						actions
							.buy(
								user.id,
								cart.map((item) => {
									return {
										id: item.id,
										quantity: item.quantity
									};
								})
							)
							.then((result) => {
								console.log(result);
								setCheck(result.check);
								setSuccessBuyModalShow(true);
							})
					}
				>
					CHECOUT
				</Button>
			</div>

			<SuccessBuyModal
				show={successBuyModalShow}
				check={check}
				onHide={() => {
					setCheck(undefined);
					setSuccessBuyModalShow(false);
					navigate("/");
				}}
			/>
		</div>
	);
}

CartPage.propTypes = {
	cart: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		cart: state.cart,
		user: state.user,
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
			),
			buy: bindActionCreators(cartActions.buyCart, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
