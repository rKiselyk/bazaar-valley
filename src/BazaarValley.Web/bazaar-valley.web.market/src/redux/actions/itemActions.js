import * as itemsApi from "../../apis/itemsApi";
import * as types from "./actionTypes";
import { apiCallError, beginApiCall } from "./apiStatusActions";

export function loadItemsSuccess(items) {
	return { type: types.LOAD_ITEMS_SUCCESS, items };
}

export function sortItems(propertyName) {
	return { type: types.SORT_ITEMS, propertyName };
}

export function loadItems(
	categoryId,
	fieldValues,
	maxPrice,
	itemsPerPage,
	startFrom = 0
) {
	return function (dispatch) {
		dispatch(beginApiCall());

		return itemsApi
			.getItems(
				categoryId,
				fieldValues,
				maxPrice,
				itemsPerPage,
				startFrom
			)
			.then((searchResult) =>
				dispatch(loadItemsSuccess(searchResult.items))
			)
			.catch((error) => {
				dispatch(apiCallError);
				throw error;
			});
	};
}
