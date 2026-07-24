import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://teeny-url-y7yf.onrender.com";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;