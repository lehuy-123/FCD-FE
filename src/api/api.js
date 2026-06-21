import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to include auth token
API.interceptors.request.use((config) => {
    const userData = JSON.parse(localStorage.getItem('facades_user'));
    if (userData && userData.token) {
        config.headers.Authorization = `Bearer ${userData.token}`;
    }
    return config;
});

export default API;
