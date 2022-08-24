import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:18080/Spring',
    withCredentials: false
});

export const instanceNews = axios.create({
    baseURL: "http://localhost:13000/news-api",
    withCredentials: false,
});
