import { useState } from 'react'
import api from '../services/api'
import { ApiError } from './types'

type RequestCodeFormProps = { setState: (state: 'email' | 'code') => void }
export const RequestCodeForm: React.FC<RequestCodeFormProps> = ({ setState }) => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            await api.post('/auth/request_code', { email })
            setState('code')
        } catch (error: unknown) {
            if (typeof error === 'object' && error !== null) {
                const apiError = error as ApiError
                setMessage('Error: ' + (apiError.response?.data?.error || apiError.message || 'Unknown error'))
            } else {
                setMessage('Error: ' + String(error))
            }
        }
    }

    return (
        <>
            <form action="" className="relative w-full mt-10 flex flex-col gap-2" onSubmit={handleSubmit}>
                <input
                    className="w-52 p-1 pl-3 bg-[#F5F5F5] outline-none rounded-xl text-[16px] focus:bg-[#F5F5F5]"
                    type="email"
                    placeholder="Your email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="absolute top-0.5 right-1 bg-black text-white text-[16px] py-1 px-3 rounded-lg h-7"
                >
                    Get code
                </button>
                {message && <p>{message}</p>}
            </form>
            <span>
                <button onClick={() => setState('code')} className="text-[16px] border rounded-lg py-1 px-3 h-7">
                    I received the code
                </button>
            </span>
        </>
    )
}
