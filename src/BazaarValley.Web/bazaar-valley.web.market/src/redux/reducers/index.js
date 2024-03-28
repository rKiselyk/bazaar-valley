import { combineReducers } from "redux";
import categories from "./categoryReducer";
import items from "./itemReducer";
import apiCallsInProgress from "./apiStatusReducer";
import cart from "./cartReducer";
import user from "./userReducer";

const rootReducer = combineReducers({
	categories,
	items,
	cart,
	user,
	apiCallsInProgress
});

export default rootReducer;
