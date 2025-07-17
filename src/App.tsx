import 'tldraw/tldraw.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './app/provider/auth-provider'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            refetchOnWindowFocus: false
        }
    }
})

const App = () => {
    if (!clientId) {
        console.error('⛔ GOOGLE CLIENT ID не найден в .env')
        return <div>Missing Google Client ID</div>
    }

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <GoogleOAuthProvider clientId={clientId}>
                    <RouterProvider router={router} />
                </GoogleOAuthProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default App
