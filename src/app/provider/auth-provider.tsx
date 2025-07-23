import { useState, PropsWithChildren } from 'react'
import { AuthContext } from '../../shared/lib/context/auth-context'

// Тип для контекста аутентификации
export type AuthContextType = {
    authToken: string | null
    login: (token: string) => void
    logout: () => void
    isAuthenticated: boolean
}

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const authState = useState(Boolean(localStorage.getItem('authToken')))

    return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
}
