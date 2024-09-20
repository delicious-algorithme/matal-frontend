import { defaultInstance } from '../utils/instance';

//검색 가게 리스트
export const getStoreList = async (params) => {
    try {
        const { data, status } = await defaultInstance.get(`/api/stores/searchAndFilter`, { params: params });
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
