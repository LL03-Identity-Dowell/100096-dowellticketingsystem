import axios from 'axios';

const baseURL = import.meta.env.VITE_SERVER_URL || "http://localhost:5173/";

if (!baseURL) {
    throw new Error('VITE_SERVER_URL is not defined in the environment variables.');
}

const servicesAxiosInstance = axios.create({
    baseURL: baseURL
});

export {
    servicesAxiosInstance
};
