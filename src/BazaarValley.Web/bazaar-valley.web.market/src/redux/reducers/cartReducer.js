import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
	switch (action.type) {
		case types.ADD_TO_CART: {
			const itemInCart = state.find((item) => item.id === action.item.id);
			if (itemInCart) {
				return state.map((i) =>
					i.id === itemInCart.id
						? {
								...itemInCart,
								quantity: itemInCart.quantity + 1
						  }
						: i
				);
			}
			return [...state, action.item];
		}
		case types.INCREASE_QUANTITY: {
			const itemInCart = state.find((item) => item.id === action.itemId);
			return state.map((item) =>
				item.id === itemInCart.id
					? {
							...itemInCart,
							quantity: itemInCart.quantity + action.quantity
					  }
					: item
			);
		}
		case types.DECREASE_QUANTITY: {
			const itemInCart = state.find((item) => item.id === action.itemId);

			if (itemInCart.quantity === 1) {
				return state.filter((item) => item.id !== action.itemId);
			}

			return state.map((item) =>
				item.id === itemInCart.id
					? {
							...itemInCart,
							quantity: itemInCart.quantity - action.quantity
					  }
					: item
			);
		}
		default:
			return state;
	}
}
