import { handleResponse, handleError } from "./apiUtils";
import { itemsUrl } from "./apiUrls";

export function getItems() {
	return fetch(itemsUrl).then(handleResponse).catch(handleError);
}
