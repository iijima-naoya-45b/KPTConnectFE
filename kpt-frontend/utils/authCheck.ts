import axios from 'axios';
import { useRouter } from 'next/router';

export const authCheck = async () => {
    const router = useRouter();
    const jwt = document.cookie.split('; ').find(row => row.startsWith('jwt='))?.split('=')[1];

    if (!jwt) {
        console.error('authCheck: JWT not found in cookies');
        router.push('/login');
        return;
    }

    try {
        const response = await axios.get('/api/v1/me', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        if (!response.data) {
            console.error('authCheck: No data returned from /api/v1/me');
            router.push('/login');
        }
    } catch (error) {
        console.error('authCheck: Error verifying JWT', error);
        router.push('/login');
    }
};