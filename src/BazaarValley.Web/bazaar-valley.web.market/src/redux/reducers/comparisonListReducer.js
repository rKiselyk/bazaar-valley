import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function comparisonListReducer(
	state = initialState.comparisonList,
	action
) {
	switch (action.type) {
		case types.ADD_TO_COMPARISON_LIST: {
			const isExisting = state.find((item) => item.id === action.item.id);
			if (isExisting) {
				return state;
			}
			return [...state, action.item];
		}
		case types.REMOVE_FROM_COMPARISON_LIST: {
			return state.filter((item) => item.id !== action.item.id);
		}
		case types.USER_LOGOUT_SUCCESS: {
			return [];
		}
		default:
			return state;
	}
}
