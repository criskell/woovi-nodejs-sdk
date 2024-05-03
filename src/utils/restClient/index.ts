import Constants from '@utils/constants';

import type { ApiConfig } from '@src/types';
import { RestClientConfig } from '@utils/types';


const RestClient = (clientConfig: ApiConfig) => {
    function appendQueryParamsToUrl(url: string, queryParams?: Record<string, string | number>): string {
		if (!queryParams) return url;

		const searchParams = new URLSearchParams();

		for (const key in queryParams) {
			if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
				searchParams.append(key, queryParams[key].toString());
			}
		}

		return url.includes('?') ? `${url}&${searchParams.toString()}` : `${url}?${searchParams.toString()}`;
	}

    function retryWithExponentialBackoff<T>(
		fn: () => Promise<T>,
		retries: number,
	): Promise<T> {
		let attempt = 1;

		const execute: () => Promise<T> = async () => {
			try {
				return await fn();
			} catch (error: unknown) {
				if (attempt >= retries || ((error as {status: number})).status < 500) {
					throw error;
				}

				const delayMs = Constants.API_RETRIE_DELAY * 2 ** attempt;
				await new Promise((resolve) => setTimeout(resolve, delayMs));

				attempt++;
				return execute();
			}
		};

		return execute();
	}

    async function fetcher<T>(
		endpoint: string,
		config?: RestClientConfig & RequestInit
	): Promise<T> {
		const {
			queryParams,
			method = 'GET',
			retries = Constants.API_RETRIES,
			...customConfig
		} = config || {};

		const url = appendQueryParamsToUrl(`${Constants.API_BASE_URL}${endpoint}`, queryParams);

		const headers = Object.assign({}, customConfig.headers, {
			[Constants.Headers.CONTENT_TYPE]: 'application/json',
			[Constants.Headers.USER_AGENT]: Constants.getUserAgent(),
            [Constants.Headers.AUTHORIZATION]: clientConfig.appId
		})

		let response: Response;

		const fetchFn = async () => {
			response = await fetch(url, Object.assign({}, {
				...customConfig,
				method
			}, {headers}));

			if (response.ok) {
				const data = await response.json();
				const api_response = {
					status: response.status,
					headers: response.headers,
				};
				data.api_response = api_response;

				return data as T;
			} else {
				throw await response.json();
			}
		};

		return await retryWithExponentialBackoff(fetchFn, retries);
	}

    return fetcher;
}

export { RestClient };