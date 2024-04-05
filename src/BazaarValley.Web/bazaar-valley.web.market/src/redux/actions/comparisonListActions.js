import * as types from "./actionTypes";

export function addToComparisonList(item) {
	return { type: types.ADD_TO_COMPARISON_LIST, item };
}

export function removeFromComparisonList(item) {
	return { type: types.REMOVE_FROM_COMPARISON_LIST, item };
}
