import { useState, type FC } from 'react'
import { BigLogo } from '../../shared/icons/big-logo'
import { RequestCodeForm } from '../../shared/request-code-form'
import { VerifyCodeForm } from '../../shared/verify-code-form'
import { GoogleAuthButton } from '../google-auth-button'
import { useAuth } from '../../shared/hooks/useAuth'

export const Plug: FC = () => {
    const [state, setState] = useState<'email' | 'code'>('email')
    const { isAuth } = useAuth()

    return (
        <div className="flex flex-col items-center ">
            <BigLogo />
            <div className="flex flex-col items-center mt-3">
                <p className="text-[40px]">Very soon something will be here</p>
                <p className="text-[16px]">Leave the email - we will let you know</p>
            </div>
            <div className="flex flex-col items-center gap-2">
                {isAuth && <p className="text-[16px]">You are logged in</p>}

                {!isAuth && state === 'email' && <RequestCodeForm setState={setState} />}
                {!isAuth && state === 'code' && <VerifyCodeForm />}
                {!isAuth && <GoogleAuthButton />}
            </div>
        </div>
    )
}
