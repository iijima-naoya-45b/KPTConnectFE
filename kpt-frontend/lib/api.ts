const getApiUrl = (): string => {
    return process.env.NEXT_PUBLIC_API_URL || '';
};

export const fetcher = async (path: string, options?: RequestInit) => {
    const url = `${getApiUrl()}${path}`;
    const res = await fetch(url, options);

    if (!res.ok) {
        const error: any = new Error('An error occurred while fetching the data.');
        try {
            error.info = await res.json();
        } catch (e) {
            // If the response is not JSON, use text
            error.info = { message: await res.text() };
        }
        error.status = res.status;
        throw error;
    }

    // If the response has no content, do not try to parse it as JSON
    if (res.status === 204) {
        return null;
    }

    return res.json();
}; 