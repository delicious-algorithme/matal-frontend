import axios from 'axios';
const REACT_APP_BackEndUrl = process.env.REACT_APP_BackEndUrl;

const Api = axios.create({
    baseURL: REACT_APP_BackEndUrl,
    headers: {
        'Content-Type': `application/json`,
    },
});

export const defaultInstance = Api;
