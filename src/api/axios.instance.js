import axios, { AxiosError } from 'axios'

const axiosInstance = axios.create({
    baseURL: `http://localhost:9191/api`,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosInstance;

