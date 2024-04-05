import { handleResponse, handleError } from "./apiUtils";
import { itemsUrl } from "./apiUrls";

export function getItems(
	categoryId,
	fieldValues,
	maxPrice,
	itemsPerPage,
	startFrom = 0,
	sorting = null
) {
	return fetch(itemsUrl, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			categoryId,
			fieldValues,
			maxPrice,
			itemsPerPage,
			startFrom,
			sorting
		})
	})
		.then(handleResponse)
		.catch(handleError);
}

export function getItemInfo(itemId) {
	return fetch(`${itemsUrl}/${itemId}`)
		.then(handleResponse)
		.catch(handleError);
}
