import axios from 'axios';
const REACT_APP_BackEndUrl = process.env.REACT_APP_BackEndUrl; // 나중에 환경변수로 바꾸기

const Api = axios.create({
    baseURL: REACT_APP_BackEndUrl,
    headers: {
        'Content-Type': `application/json`,
    },
});

export const defaultInstance = Api;
