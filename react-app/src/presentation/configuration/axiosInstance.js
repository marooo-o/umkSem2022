import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/Spring',
    withCredentials: false
});

export default instance;
