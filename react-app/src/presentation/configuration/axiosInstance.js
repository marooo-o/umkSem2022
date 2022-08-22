import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:8080/Spring',
    withCredentials: false
});

export const instanceNews = axios.create({
    baseURL: "http://localhost:3000/news-api",
    withCredentials: false,
});
