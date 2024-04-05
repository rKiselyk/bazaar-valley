import { handleResponse, handleError } from "./apiUtils";
import { orderUrl } from "./apiUrls";

export function getOrderHistory(userId) {
	return fetch(orderUrl + userId + "/history")
		.then(handleResponse)
		.catch(handleError);
}
