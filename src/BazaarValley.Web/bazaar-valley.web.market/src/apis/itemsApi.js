import { handleResponse, handleError } from "./apiUtils";
import { itemsUrl } from "./apiUrls";

export function getItems(categoryId) {
	const params = new URLSearchParams({ categoryId: categoryId });

	const t = itemsUrl + "?" + params.toString();
	return fetch(t).then(handleResponse).catch(handleError);
}
