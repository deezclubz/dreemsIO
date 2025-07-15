import { createBrowserRouter } from 'react-router-dom'
import { Protected } from './protected'
import { Plug } from '../components/temp/plug'
import { SignInPage } from '../pages/sign-in-page'
import { MainFeatures } from '../components/temp/main-features'

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: (
                <Protected>
                    <Plug />
                </Protected>
            )
        },
        {
            path: 'main-features',
            element: (
                <Protected>
                    <MainFeatures />
                </Protected>
            )
        },
        { path: '/signin', element: <SignInPage /> }
    ],
    { basename: '/' }
)
