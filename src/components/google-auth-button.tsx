import { GoogleLogin } from '@react-oauth/google'
import api from '../services/api'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useNavigate } from 'react-router'

export const GoogleAuthButton: React.FC = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const handleSuccess = async (credentialResponse: { credential?: string }) => {
        if (!credentialResponse.credential) {
            console.error('Google did not return a credential')
            return
        }

        try {
            // Отправляем данные на бекенд
            const response = await api.post('/auth/google', {
                google_token: credentialResponse.credential
            })

            login(response.data.token)
            navigate('/')
        } catch (error) {
            console.error('Google auth failed', error)
        } finally {
            console.log('Google auth completed')
        }
    }

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log('Login Failed')}
            useOneTap // Опционально: автоматическое всплывающее окно
            auto_select // Опционально: автоматический выбор аккаунта
        />
    )
}
