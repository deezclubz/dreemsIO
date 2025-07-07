import { createContext, useState, PropsWithChildren, Dispatch, SetStateAction } from 'react'

// Тип для контекста аутентификации
export type AuthContextType = {
    authToken: string | null
    login: (token: string) => void
    logout: () => void
    isAuthenticated: boolean
}

// Создаем контекст с явным указанием типа
type AuthState = boolean
export const AuthContext = createContext<[AuthState, Dispatch<SetStateAction<AuthState>>]>([false, () => {}])

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const authState = useState(Boolean(localStorage.getItem('authToken')))

    return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
}
