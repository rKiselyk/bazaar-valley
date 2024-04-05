import * as wishlistApi from "../../apis/wishlistApi";
import * as types from "./actionTypes";
import { apiCallError, beginApiCall } from "./apiStatusActions";

export function getItemsSuccess(wishlist) {
	return { type: types.LOAD_WISHLIST_SUCCESS, wishlist };
}

export function addItemSuccess(item) {
	return { type: types.ADD_TO_WISHLIST_SUCCESS, item };
}

export function deleteItemSuccess(itemId) {
	return { type: types.REMOVE_FROM_WISHLIST_SUCCESS, itemId };
}

export function getItems(userId) {
	return function (dispatch) {
		dispatch(beginApiCall());

		return wishlistApi
			.getItems(userId)
			.then((wishlist) => dispatch(getItemsSuccess(wishlist)))
			.catch((error) => {
				dispatch(apiCallError);
				throw error;
			});
	};
}

export function addItem(userId, itemId) {
	return function (dispatch) {
		dispatch(beginApiCall());

		return wishlistApi
			.addItem(userId, itemId)
			.then((item) => dispatch(addItemSuccess(item)))
			.catch((error) => {
				dispatch(apiCallError);
				throw error;
			});
	};
}

export function deleteItem(userId, itemId) {
	return function (dispatch) {
		dispatch(beginApiCall());

		return wishlistApi
			.addItem(userId, itemId)
			.then(() => dispatch(deleteItemSuccess(itemId)))
			.catch((error) => {
				dispatch(apiCallError);
				throw error;
			});
	};
}
