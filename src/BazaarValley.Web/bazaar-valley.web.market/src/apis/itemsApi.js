import { handleResponse, handleError } from "./apiUtils";
import { itemsUrl } from "./apiUrls";

export function getItems(categoryId, fieldValues) {
	return fetch(itemsUrl, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ categoryId, fieldValues })
	})
		.then(handleResponse)
		.catch(handleError);
}
