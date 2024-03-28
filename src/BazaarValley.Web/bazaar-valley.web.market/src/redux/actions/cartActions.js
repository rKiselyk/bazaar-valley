import * as types from "./actionTypes";

export function addToCart(item) {
	return { type: types.ADD_TO_CART, item };
}

export function increaseQuantity(itemId, quantity) {
	return { type: types.INCREASE_QUANTITY, itemId, quantity };
}

export function decreaseQuantity(itemId, quantity) {
	return { type: types.DECREASE_QUANTITY, itemId, quantity };
}
