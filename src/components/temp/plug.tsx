import { useAuth } from '../../features/auth/hooks/useAuth'
import { BigLogo } from '../../shared/icons/big-logo'

export const Plug: React.FC = () => {
    const { logout } = useAuth()
    return (
        <main className="flex flex-col h-full">
            <header className="p-2 flex items-center justify-between gap-2 border border-gray-100 rounded-lg">
                <BigLogo className="h-8" />
                <button onClick={() => logout()} className="text-[16px] border rounded-lg py-1 px-3 h-7">
                    Logout
                </button>
            </header>
            <div className="flex flex-col items-center flex-1 p-4">Content</div>
        </main>
    )
}
