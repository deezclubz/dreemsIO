import { useContext } from 'react'
import { AuthContext } from '../../provider/auth-provider'

export const useAuth = () => {
    const [isAuth, setIsAuth] = useContext(AuthContext)

    const login = (token: string) => {
        localStorage.setItem('authToken', token)
        setIsAuth(true)
    }

    const logout = () => {
        localStorage.removeItem('authToken')
        setIsAuth(false)
    }

    return {
        isAuth,
        login,
        logout
    }
}
