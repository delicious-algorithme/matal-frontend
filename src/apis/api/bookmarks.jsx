import { defaultInstance } from '../utils/instance';

export const getBookmarks = async (params) => {
    try {
        const { data, status } = await defaultInstance.get(`/api/bookmarks`, { params: params });
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

export const postBookmarks = async (body) => {
    const jsonBody = JSON.stringify(body);

    try {
        const { data, status } = await defaultInstance.get(`/api/bookmarks`, jsonBody);
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

export const deleteBookmarks = async (id, body) => {
    const jsonBody = JSON.stringify(body);

    try {
        const { data, status } = await defaultInstance.get(`/api/bookmarks`, { params: id }, jsonBody);
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
