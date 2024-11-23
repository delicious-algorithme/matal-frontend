import { defaultInstance } from '../utils/instance';

export const getBookmarksStores = async (page) => {
    try {
        const { data, status } = await defaultInstance.get(`/api/bookmarks`, {
            params: { page: page },
            withCredentials: true,
        });
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

export const postBookmarkStore = async (id) => {
    try {
        const { data, status } = await defaultInstance.post(`/api/bookmarks`, id, {
            withCredentials: true,
        });
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

export const deleteBookmarkStore = async (id) => {
    try {
        const { data, status } = await defaultInstance.delete(`/api/bookmarks/${id}`, {
            withCredentials: true,
        });
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
