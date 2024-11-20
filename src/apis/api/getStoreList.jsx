import { defaultInstance } from '../utils/instance';

//검색 가게 리스트
export const getStoreList = async (params) => {
    const jsonBody = JSON.stringify(params);

    try {
        const response = await defaultInstance.post(`/api/stores/searchAndFilter`, jsonBody);
        return response;
    } catch (e) {
        console.log(e.response ? e.response.data : e);
        return {
            error: e.response ? e.response.data.detail : 'Unknown error',
            status: e.response ? e.response.status : 500,
        };
    }
};
