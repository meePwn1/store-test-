export type TServerSideResponse<T> = {
	data?: T
	error?: string
}

const baseURL = process.env.NEXT_PUBLIC_API

const buildURL = (endPoint: string, params?: Record<string, boolean | null | number | string>): string => {
	const url = new URL(endPoint, baseURL)
	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			if (value !== null && value !== undefined) {
				url.searchParams.append(key, String(value))
			}
		})
	}
	return url.toString()
}

export const fetchData = async <T>(
	endPoint: string,
	options: RequestInit = { method: 'GET' },
	params?: Record<string, boolean | null | number | string>
): Promise<TServerSideResponse<T>> => {
	const url = buildURL(endPoint, params)

	try {
		const response = await fetch(url, {
			...options,
		})
		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(`Failed to fetch data: ${response.status} ${response.statusText} - ${errorText}`)
		}

		const data: T | undefined = await response.json()

		return { data }
	} catch (error: unknown) {
		return { error: error instanceof Error ? error.message : 'Unknown error occurred' }
	}
}
