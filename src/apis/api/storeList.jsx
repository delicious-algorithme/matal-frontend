import { defaultInstance } from '../utils/instance';

//검색 가게 리스트
export const getStoreList = async (params) => {
    console.log(params);
    try {
        const { data, status } = await defaultInstance.get(`/api/stores/search`, { params: params });
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
