import { handleResponse, handleError } from "./apiUtils";
import { wishlistUrl } from "./apiUrls";

export function getItems(userId) {
	return fetch(wishlistUrl(userId)).then(handleResponse).catch(handleError);
}

export function addItem(userId, itemId) {
	return fetch(wishlistUrl(userId), {
		method: "PUT",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ itemId })
	})
		.then(handleResponse)
		.catch(handleError);
}

export function deleteItem(userId, itemId) {
	return fetch(wishlistUrl(userId) + `/${itemId}`, {
		method: "DELETE",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ itemId })
	})
		.then(handleResponse)
		.catch(handleError);
}
