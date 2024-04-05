import { combineReducers } from "redux";
import categories from "./categoryReducer";
import items from "./itemReducer";
import apiCallsInProgress from "./apiStatusReducer";
import cart from "./cartReducer";
import user from "./userReducer";
import comparisonList from "./comparisonListReducer";
import wishlist from "./wishlistReducer";

const rootReducer = combineReducers({
	categories,
	items,
	cart,
	user,
	comparisonList,
	wishlist,
	apiCallsInProgress
});

export default rootReducer;
