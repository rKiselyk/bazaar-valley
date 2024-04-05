export const baseUrl = "https://localhost:7162";

export const categoriesUrl = baseUrl + "/categories/";
export const itemsUrl = baseUrl + "/items/";
export const usersUrl = baseUrl + "/users/";
export const cartUrl = baseUrl + "/cart/";
export const orderUrl = baseUrl + "/orders/";

export function wishlistUrl(userId) {
	return usersUrl + userId + "/wishlist";
}
