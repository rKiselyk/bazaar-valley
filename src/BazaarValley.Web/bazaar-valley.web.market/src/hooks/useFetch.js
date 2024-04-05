import { useEffect, useState } from "react";
import { baseUrl } from "../apis/apiUrls";

export default function useFetch(url) {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function init() {
			try {
				const response = await fetch(baseUrl + url);
				if (response.ok) {
					const josn = await response.json();
					setData(josn);
				} else {
					throw response;
				}
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}

		init();
	}, [url]);

	return {
		data,
		error,
		loading
	};
}
