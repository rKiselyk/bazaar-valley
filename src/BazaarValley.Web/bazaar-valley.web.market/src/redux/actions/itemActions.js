import * as itemsApi from "../../apis/itemsApi";
import * as types from "./actionTypes";
import { apiCallError, beginApiCall } from "./apiStatusActions";

export function loadItemsSuccess(items) {
	return { type: types.LOAD_ITEMS_SUCCESS, items };
}

export function loadItems(categoryId, fieldValues) {
	return function (dispatch) {
		dispatch(beginApiCall());

		return itemsApi
			.getItems(categoryId, fieldValues)
			.then((categories) => dispatch(loadItemsSuccess(categories)))
			.catch((error) => {
				dispatch(apiCallError);
				throw error;
			});
	};
}
