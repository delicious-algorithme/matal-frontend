import { defaultInstance } from '../utils/instance';

export const getBookmarksStores = async () => {
    try {
        const { data, status } = await defaultInstance.get(`/api/bookmarks`, {
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

export const postBookmarkStore = async (body) => {
    //const jsonBody = JSON.stringify(1);
    try {
        const { data, status } = await defaultInstance.post(`/api/bookmarks`, 1, {
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

export const deleteBookmarkStore = async (id, body) => {
    const jsonBody = JSON.stringify(body);

    try {
        const { data, status } = await defaultInstance.delete(`/api/bookmarks`, { params: id }, jsonBody, {
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
