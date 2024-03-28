import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducer(state = initialState.user, action) {
	switch (action.type) {
		case types.USER_LOGIN_SUCCESS: {
			return action.userInfo;
		}
		case types.USER_LOGOUT_SUCCESS: {
			return null;
		}
		case types.USER_REGISTER_SUCCESS: {
			return action.userInfo;
		}
		default:
			return state;
	}
}
