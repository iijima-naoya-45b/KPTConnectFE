import axios from 'axios';

export const fetchUserInfo = async () => {
    const jwt = document.cookie.split('; ').find(row => row.startsWith('jwt='))?.split('=')[1];

    if (!jwt) {
        console.error('fetchUserInfo: JWT not found in cookies');
        throw new Error('Authentication required');
    }

    try {
        const response = await axios.get('/api/v1/me', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('fetchUserInfo: Error fetching user info', error);
        throw new Error('Failed to fetch user information');
    }
}; 