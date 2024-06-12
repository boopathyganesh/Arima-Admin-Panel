import axios from "axios";

import { HOST_API } from '../config';

console.log('HOST_API', HOST_API);

const axiosInstance = axios.create({
    baseURL: HOST_API,
    header: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;