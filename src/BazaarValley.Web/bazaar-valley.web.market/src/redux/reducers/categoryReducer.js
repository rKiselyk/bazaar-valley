import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function categoryReducer(
	state = initialState.categories,
	action
) {
	switch (action.type) {
		case types.LOAD_CATEGORIES_SUCCESS:
			return action.categories;
		case types.LOAD_CATEGORY_FIELDS_VALUES_SUCCESS:
			return state.map((category) =>
				category.id === action.categoryId
					? { ...category, fieldsValues: action.fieldsValues }
					: category
			);
		default:
			return state;
	}
}
