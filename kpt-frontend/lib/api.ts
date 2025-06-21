const getApiUrl = (): string => {
    return process.env.NEXT_PUBLIC_API_URL || '';
};

export const fetcher = async (path: string, options?: RequestInit) => {
    const url = `${getApiUrl()}${path}`;
    const res = await fetch(url, options);

    if (!res.ok) {
        const error: any = new Error('An error occurred while fetching the data.');
        error.status = res.status;

        // レスポンスbodyは一度だけ読み込む
        try {
            const contentType = res.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                error.info = await res.json();
            } else {
                error.info = { message: await res.text() };
            }
        } catch (e) {
            // 読み込みに失敗した場合はデフォルトメッセージ
            error.info = { message: `HTTP ${res.status}: ${res.statusText}` };
        }

        throw error;
    }

    // If the response has no content, do not try to parse it as JSON
    if (res.status === 204) {
        return null;
    }

    return res.json();
}; 