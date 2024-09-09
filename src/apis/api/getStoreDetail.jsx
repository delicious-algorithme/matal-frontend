import { defaultInstance } from '../utils/instance';

// 가게 상세 정보
export const getStoreDetail = async (id) => {
    try {
        const { data, status } = await defaultInstance.get(`/api/stores/${id.storeId}`);
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
