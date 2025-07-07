import type { FC } from 'react'
import { BigLogo } from '../../shared/icons/big-logo'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { jwtDecode, JwtPayload } from 'jwt-decode'

export const Plug: FC = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget
        const emailInput = form.elements.namedItem('email') as HTMLInputElement
        const email = emailInput.value

        window.location.href = `mailto:your@email.com?subject=New Submission&body=Email: ${email}`
    }

    return (
        <div className="flex flex-col items-center ">
            <BigLogo />
            <div className="flex flex-col items-center mt-3">
                <p className="text-[40px]">Very soon something will be here</p>
                <p className="text-[16px]">Leave the email - we will let you know</p>
            </div>
            <form action="" className="relative mt-10 flex flex-col gap-2" onSubmit={handleSubmit}>
                <input
                    className="w-52 p-1 pl-3 bg-[#F5F5F5] outline-none rounded-xl text-[16px] focus:bg-[#F5F5F5]"
                    type="email"
                    placeholder="Your email"
                    name="email"
                    id="email"
                    required
                />
                <GoogleLogin
                    onSuccess={(credentialResponse: CredentialResponse) => {
                        // 1) безопасно проверяем, что credential есть
                        if (!credentialResponse.credential) {
                            console.error('Google did not return a credential')
                            return
                        }

                        // 2) теперь credential точно string
                        const decoded = jwtDecode<JwtPayload>(credentialResponse.credential)
                        console.log(decoded)

                        // ...отправляем decoded на бекенд
                    }}
                    onError={() => {
                        console.log('Login Failed')
                    }}
                />
                <button
                    type="submit"
                    className="absolute top-0.5 right-1 bg-black text-white text-[16px] py-1 px-3 rounded-lg h-7"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
