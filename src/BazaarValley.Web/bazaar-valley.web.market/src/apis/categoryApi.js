import { handleResponse, handleError } from "./apiUtils";
import { categoriesUrl } from "./apiUrls";

export function getCategories() {
	return fetch(categoriesUrl).then(handleResponse).catch(handleError);
}

export function getCategoryFieldsValuesInfo(categoryId) {
	return fetch(categoriesUrl + categoryId + "/fields/values")
		.then(handleResponse)
		.catch(handleError);
}
