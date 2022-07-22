import axios from "axios";

const DEBUG = process.env.NODE_ENV === "development";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: false,
    headers: {},
});

api.interceptors.request.use(
    (config) => {
        if (DEBUG) console.info("-> ", config);

        return config;
    },
    (error) => {
        if (DEBUG) console.error("-> ", error);

        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        if (DEBUG) console.info("<- ", response);

        return response;
    },
    (error) => {
        if (DEBUG) console.error("<- ", error.response);

        return Promise.reject(error);
    }
);

export default api;
