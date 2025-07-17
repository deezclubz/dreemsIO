import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'

export const Protected: FC<PropsWithChildren> = ({ children }) => {
    const { isAuth } = useAuth()
    if (!isAuth) {
        return <Navigate to="/signin" replace />
    }

    return children
}
