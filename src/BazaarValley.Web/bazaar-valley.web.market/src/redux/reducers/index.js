import { combineReducers } from "redux";
import categories from "./categoryReducer";
import items from "./itemReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
	categories,
	items,
	apiCallsInProgress
});

export default rootReducer;
