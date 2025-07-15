import { useContext } from 'react'
import { AuthContext } from '../../../shared/lib/context/auth-context'
import { useNavigate } from 'react-router'

export const useAuth = () => {
    const [isAuth, setIsAuth] = useContext(AuthContext)
    const navigate = useNavigate()

    const login = (token: string) => {
        localStorage.setItem('authToken', token)
        setIsAuth(true)
    }

    const logout = () => {
        localStorage.removeItem('authToken')
        setIsAuth(false)
        navigate('/signin')
    }

    return {
        isAuth,
        login,
        logout
    }
}
