import { defaultInstance } from '../utils/instance';

export const getStoreAll = async (params) => {
    try {
        const { data, status } = await defaultInstance.get(`/api/stores/all`, { params: params });
        return {
            data,
            status,
        };
    } catch (e) {
        console.log(e);
        return {
            error: e.response.data.detail,
            status: e.response.status,
        };
    }
};
