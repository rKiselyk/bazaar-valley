import * as itemsApi from "../../apis/itemsApi";
import * as types from "./actionTypes";
import { apiCallError, beginApiCall } from "./apiStatusActions";

export function loadItemsSuccess(items) {
	return { type: types.LOAD_ITEMS_SUCCESS, items };
}

export function loadItems(
	categoryId,
	fieldValues,
	maxPrice,
	itemsPerPage,
	startFrom = 0,
	sorting = null
) {
	return function (dispatch) {
		dispatch(beginApiCall());

		return itemsApi
			.getItems(
				categoryId,
				fieldValues,
				maxPrice,
				itemsPerPage,
				startFrom,
				sorting
			)
			.then((searchResult) => dispatch(loadItemsSuccess(searchResult)))
			.catch((error) => {
				dispatch(apiCallError);
				throw error;
			});
	};
}
