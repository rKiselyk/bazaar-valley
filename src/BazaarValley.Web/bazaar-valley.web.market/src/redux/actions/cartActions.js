import * as cartApi from "../../apis/cartApi";
import * as types from "./actionTypes";
import { apiCallError, beginApiCall } from "./apiStatusActions";

export function addToCart(item) {
	return { type: types.ADD_TO_CART, item };
}

export function removeFromCart(item) {
	return { type: types.REMOVE_FROM_CART, item };
}

export function increaseQuantity(itemId, quantity) {
	return { type: types.INCREASE_QUANTITY, itemId, quantity };
}

export function decreaseQuantity(itemId, quantity) {
	return { type: types.DECREASE_QUANTITY, itemId, quantity };
}

export function buyCartSuccess(check) {
	return { type: types.BUY_CART_SUCCESS, check };
}

export function buyCart(userId, items) {
	return function (dispatch) {
		dispatch(beginApiCall());

		return cartApi
			.cartBuy(userId, items)
			.then((check) => dispatch(buyCartSuccess(check)))
			.catch((error) => {
				dispatch(apiCallError);
				throw error;
			});
	};
}
