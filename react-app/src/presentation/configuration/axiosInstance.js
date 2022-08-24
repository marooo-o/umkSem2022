import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:18080/Spring',
    withCredentials: false
});

export default instance;
