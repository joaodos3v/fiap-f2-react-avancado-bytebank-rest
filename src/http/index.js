import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:3000/',
});

http.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default http
