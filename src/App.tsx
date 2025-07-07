import 'tldraw/tldraw.css'
import { Plug } from './components/temp/plug'
import { MainFeatures } from './components/temp/main-features'
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string

const App = () => {
    const showPlug = true

    if (!clientId) {
        console.error('⛔ GOOGLE CLIENT ID не найден в .env')
        return <div>Missing Google Client ID</div>
    }

    return <GoogleOAuthProvider clientId={clientId}>{showPlug ? <Plug /> : <MainFeatures />}</GoogleOAuthProvider>
}

export default App
