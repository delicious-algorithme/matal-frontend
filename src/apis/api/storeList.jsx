import { defaultInstance } from '../utils/instance';

//category 검색 가게 리스트
export const getStoreList = async (params) => {
    console.log(params);
    try {
        const { data, status } = await defaultInstance.get(`api/stores/search`, { params: params });
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
//nearby_station 검색 가게 리스트
export const getStationStoreList = async (params) => {
    try {
        const { data, status } = await defaultInstance.get(`api/stores/search/nearby_station`, { params: params });
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
//name 검색 가게리스트
export const getNameStoreList = async (params) => {
    try {
        const { data, status } = await defaultInstance.get(`api/stores/search/name`, { params: params });
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
    console.log('Store ID:', id);
    try {
        const { data, status } = await defaultInstance.get(`api/stores/${id.storeId}`);
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
