import * as categoryApi from "../../apis/categoryApi";
import * as types from "./actionTypes";
import { apiCallError, beginApiCall } from "./apiStatusActions";

export function loadCategoriesSuccess(categories) {
	return { type: types.LOAD_CATEGORIES_SUCCESS, categories };
}

export function loadCategoryFieldsValuesSuccess(categoryId, fieldsValues) {
	return {
		type: types.LOAD_CATEGORY_FIELDS_VALUES_SUCCESS,
		categoryId,
		fieldsValues
	};
}

export function loadCategories() {
	return function (dispatch) {
		dispatch(beginApiCall());

		return categoryApi
			.getCategories()
			.then((categories) => dispatch(loadCategoriesSuccess(categories)))
			.catch((error) => {
				dispatch(apiCallError);
				throw error;
			});
	};
}

export function loadCategoryFieldsValues(categoryId) {
	return function (dispatch) {
		dispatch(beginApiCall());

		return categoryApi
			.getCategoryFieldsValuesInfo(categoryId)
			.then((category) =>
				dispatch(loadCategoryFieldsValuesSuccess(category))
			)
			.catch((error) => {
				dispatch(apiCallError);
				throw error;
			});
	};
}
