import { GoogleLogin } from '@react-oauth/google'
import api from '../services/api'
import { useAuth } from '../shared/hooks/useAuth'

export const GoogleAuthButton: React.FC = () => {
    const { login } = useAuth()
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
        } catch (error) {
            console.error('Google auth failed', error)
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
