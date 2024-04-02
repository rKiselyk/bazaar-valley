import { handleResponse, handleError } from "./apiUtils";
import { cartUrl } from "./apiUrls";

export function cartBuy(userId, items) {
	return fetch(cartUrl + "buy", {
		method: "PUT",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ userId, items })
	})
		.then(handleResponse)
		.catch(handleError);
}
