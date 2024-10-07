import { defaultInstance } from '../utils/instance';

//top10 가게 리스트
export const getTopStores = async () => {
    try {
        const { data, status } = await defaultInstance.get(`/api/stores/top`);
        return {
            data,
            status,
        };
    } catch (e) {
        console.log(e.response ? e.response.data : e);
        return {
            error: e.response ? e.response.data.detail : 'Unknown error',
            status: e.response ? e.response.status : 500,
        };
    }
};
