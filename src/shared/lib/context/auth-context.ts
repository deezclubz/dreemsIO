import { createContext, Dispatch, SetStateAction } from 'react'

// Создаем контекст с явным указанием типа
type AuthState = boolean

export const AuthContext = createContext<[AuthState, Dispatch<SetStateAction<AuthState>>]>([false, () => {}])
