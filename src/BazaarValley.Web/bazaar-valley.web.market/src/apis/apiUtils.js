export async function handleResponse(response) {
	if (response.ok) {
		try {
			const text = await response.text();
			return text ? JSON.parse(text) : {};
		} catch (e) {
			throw new Error("Response was not valid JSON.");
		}
	}
	if (response.status === 400) {
		const error = await response.text();
		throw new Error(error);
	}
	throw new Error("Network response was not ok.");
}

export function handleError(error) {
	// eslint-disable-next-line no-console
	console.error("API call failed. " + error);
	throw error;
}
