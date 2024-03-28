import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import { thunk } from "redux-thunk";
import initialState from "./reducers/initialState";

export default function configureStore(initialState) {
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

	return createStore(
		rootReducer,
		initialState,
		composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
	);
}

export const saveState = (state) => {
	localStorage.setItem("cart", JSON.stringify(state.cart || []));
	localStorage.setItem("user", JSON.stringify(state.user));
};

export const loadState = () => {
	try {
		return {
			...initialState,
			cart: JSON.parse(localStorage.getItem("cart")),
			user: JSON.parse(localStorage.getItem("user"))
		};
	} catch (err) {
		return initialState; // Errors could occur if the stored state is invalid.
	}
};
