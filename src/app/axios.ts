import axios from 'axios'
import Cookies from 'js-cookie'
import { CookieNames } from '../shared/constants'

export const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_REST_API_BASE_URL}/api`,
    timeout: 10000,
    headers: {
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json'
    }
})

// Интерцептор для добавления токена
apiClient.interceptors.request.use(config => {
    // Получаем токен из localStorage (или откуда вы его храните)
    const token = localStorage.getItem('authToken') || Cookies.get(CookieNames.AccessToken)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Интерцептор для обработки ошибок (опционально)
apiClient.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config
        if (error.response?.status === 401 && !originalRequest._retry) {
            try {
                const token = localStorage.getItem('authToken')
                if (token) {
                    originalRequest.headers.Authorization = `Bearer ${token}`
                }
            } catch (refreshError) {
                return Promise.reject(refreshError)
            }
            // Здесь можно добавить логику выхода при 401 ошибке
            console.error('Unauthorized, logging out...')
            // Ваш хук useAuth должен быть доступен здесь или можно вызвать logout
        }
        return Promise.reject(error)
    }
)
