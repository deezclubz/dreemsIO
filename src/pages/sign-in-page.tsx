import React, { useState } from 'react'
import { BigLogo } from '../shared/icons/big-logo'
import { useAuth } from '../features/auth/hooks/useAuth'
import { GoogleAuthButton } from '../components/google-auth-button'
import { VerifyCodeForm } from '../shared/verify-code-form'
import { RequestCodeForm } from '../shared/request-code-form'

type SignInPageProps = {
    className?: string
}

export const SignInPage: React.FC<SignInPageProps> = () => {
    const [state, setState] = useState<'email' | 'code'>('email')
    const { isAuth } = useAuth()

    return (
        <div className="flex flex-col items-center ">
            <BigLogo className="h-52" />
            <div className="flex flex-col items-center mt-3">
                <p className="text-[40px]">Very soon something will be here</p>
                <p className="text-[16px]">Leave the email - we will let you know</p>
            </div>
            <div className="flex flex-col items-center gap-2">
                {isAuth && <p className="text-[16px]">You are logged in</p>}

                {state === 'email' && <RequestCodeForm setState={setState} />}
                {state === 'code' && <VerifyCodeForm />}
                <GoogleAuthButton />
            </div>
        </div>
    )
}
