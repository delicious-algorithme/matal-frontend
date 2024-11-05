import { defaultInstance } from '../utils/instance';

export const signUp = async (submitForms) => {
    const jsonBody = JSON.stringify(submitForms);
    try {
        const { data, status } = await defaultInstance.post('/api/users/signup', jsonBody);
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
