import { handleResponse, handleError } from "./apiUtils";
import { usersUrl } from "./apiUrls";

export function userLogin(email, password) {
	return fetch(usersUrl + "login", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ email, password })
	})
		.then(handleResponse)
		.catch(handleError);
}

export function registerUser(email, password, name) {
	return fetch(usersUrl, {
		method: "PUT",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ email, password, name })
	})
		.then(handleResponse)
		.catch(handleError);
}
