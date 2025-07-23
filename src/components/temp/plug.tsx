import { useAuth } from '../../features/auth/hooks/useAuth'
import { useProducts } from '../../features/products/hooks/useProducts'
import { ProductType } from '../../features/products/types/type'
import { Product } from '../../features/products/ui/product'
import { BigLogo } from '../../shared/icons/big-logo'

export const Plug: React.FC = () => {
    const { logout } = useAuth()
    const { data } = useProducts()
    console.log(data)
    return (
        <main className="flex flex-col h-full">
            <header className="p-2 flex items-center justify-between gap-2 border border-gray-100 rounded-lg">
                <BigLogo className="h-8" />
                <button onClick={() => logout()} className="text-[16px] border rounded-lg py-1 px-3 h-7">
                    Logout
                </button>
            </header>
            <div className="flex gap-2 flex-1 p-4">
                {data?.map((product: ProductType) => {
                    return <Product key={product.id} product={product} />
                })}
            </div>
        </main>
    )
}
