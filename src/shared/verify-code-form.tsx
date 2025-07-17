import { useState } from 'react'
import api from '../services/api'
import { ApiError } from './types'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useNavigate } from 'react-router'

export const VerifyCodeForm: React.FC = () => {
    const [code, setCode] = useState('')
    const [message, setMessage] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            const response = await api.post('/auth/verify_code', { code })

            login(response.data.token)
            navigate('/')
        } catch (error: unknown) {
            if (typeof error === 'object' && error !== null) {
                const apiError = error as ApiError
                setMessage('Error: ' + (apiError.response?.data?.error || apiError.message || 'Unknown error'))
            } else {
                setMessage('Error: ' + String(error))
            }
        } finally {
            console.log('Code verification auth completed')
        }
    }

    return (
        <form action="" className="relative w-full mt-10 flex flex-col gap-2" onSubmit={handleSubmit}>
            <input
                className="w-52 p-1 pl-3 bg-[#F5F5F5] outline-none rounded-xl text-[16px] focus:bg-[#F5F5F5]"
                type="text"
                placeholder="Your code"
                name="code"
                id="code"
                value={code}
                onChange={e => setCode(e.target.value)}
                required
            />

            <button
                type="submit"
                className="absolute top-0.5 right-1 bg-black text-white text-[16px] py-1 px-3 rounded-lg h-7"
            >
                Submit
            </button>
            {message && <p>{message}</p>}
        </form>
    )
}
