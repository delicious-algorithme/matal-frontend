import { defaultInstance } from '../utils/instance';

export const login = async (loginForms) => {
    const jsonBody = JSON.stringify(loginForms);
    try {
        const { data, status } = await defaultInstance.post('/api/users/login', jsonBody, {
            withCredentials: true,
        });
        return {
            data,
            status,
        };
    } catch (e) {
        console.log('response: ', e.response.data);
        return {
            error: e.response.data ? e.response.data : 'Unknown error',
        };
    }
};

export const logout = async () => {
    try {
        const status = await defaultInstance.post(
            '/api/users/logout',
            {},
            {
                withCredentials: true,
            }
        );
        return status;
    } catch (e) {
        console.log('response: ', e.response.data);
        return {
            error: e.response.data ? e.response.data : 'Unknown error',
        };
    }
};
