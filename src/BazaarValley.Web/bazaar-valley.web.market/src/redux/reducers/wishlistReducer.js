import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function wishlistReducer(state = initialState.wishlist, action) {
	switch (action.type) {
		case types.ADD_TO_WISHLIST_SUCCESS: {
			return [...state, action.item];
		}
		case types.REMOVE_FROM_WISHLIST_SUCCESS: {
			return state.filter((item) => item.itemId !== action.itemId);
		}
		case types.LOAD_WISHLIST_SUCCESS: {
			return action.wishlist;
		}
		default:
			return state;
	}
}
