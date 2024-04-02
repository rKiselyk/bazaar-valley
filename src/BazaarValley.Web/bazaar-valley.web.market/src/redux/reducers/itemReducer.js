import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const sortByKey = (key) => (a, b) => a[key] < b[key] ? 1 : -1;

export default function itemReducer(state = initialState.items, action) {
	switch (action.type) {
		case types.LOAD_ITEMS_SUCCESS:
			return action.items;
		case types.SORT_ITEMS:
			return state.slice().sort(sortByKey(action.propertyName));
		default:
			return state;
	}
}
