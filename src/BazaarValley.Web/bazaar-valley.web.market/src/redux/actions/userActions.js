import { func } from "prop-types";
import * as userApi from "../../apis/userApi";
import * as types from "./actionTypes";
import { apiCallError, beginApiCall } from "./apiStatusActions";

export function userLoginSuccess(userInfo) {
	return { type: types.USER_LOGIN_SUCCESS, userInfo };
}

export function userLogoutSuccess() {
	return { type: types.USER_LOGOUT_SUCCESS };
}

export function registerUserSuccess(userInfo) {
	return { type: types.USER_REGISTER_SUCCESS, userInfo };
}

export function userLogin(email, password) {
	return function (dispatch) {
		dispatch(beginApiCall());

		return userApi
			.userLogin(email, password)
			.then((userInfo) => dispatch(userLoginSuccess(userInfo)))
			.catch((error) => {
				dispatch(apiCallError);
				throw error;
			});
	};
}

export function userLogout() {
	return function (dispatch) {
		return Promise.resolve().then(() => dispatch(userLogoutSuccess()));
	};
}

// TODO, rework for object and validste
export function registerUser(email, password, name) {
	return function (dispatch) {
		dispatch(beginApiCall());

		return userApi
			.registerUser(email, password, name)
			.then((userInfo) => dispatch(userLoginSuccess(userInfo)))
			.catch((error) => {
				dispatch(apiCallError);
				throw error;
			});
	};
}
