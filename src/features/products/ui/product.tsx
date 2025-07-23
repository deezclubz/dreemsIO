import React from 'react'

import { useAddPreorder } from '../../preorder/hook/useAddPreorder'
import { useGetPreorders } from '../../preorder/hook/useGetPreorders'
import { useRemovePreorder } from '../../preorder/hook/useRemovePreorder'
import { ProductType } from '../types/type'

type ProductProps = {
    className?: string
    product: ProductType
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const { data: preorder, isLoading: isPreordersLoading } = useGetPreorders(product.id)

    const { mutate: addPreorder, isPending: isAdding } = useAddPreorder()
    const { mutate: removePreorder, isPending: isRemoving } = useRemovePreorder()

    const handlePreorder = () => {
        addPreorder({ productId: product.id })
    }

    const handleRemovePreorder = () => {
        removePreorder({ productId: product.id })
    }

    const userHasPreordered = preorder?.user_has_preordered ?? false
    const isLoading = isAdding || isRemoving || isPreordersLoading
    return (
        <div className="flex flex-col gap-2">
            <div key={product.id} className="flex flex-col items-center gap-2 p-4 border border-gray-100 rounded-lg">
                <p className="text-[16px]">Name: {product.name}</p>
                <p className="text-[16px]">Description: {product.description}</p>
                <p className="text-[16px]">Preorders goal: {product.preorder_goal}</p>
                <p className="text-[16px]">Preorders count: {product.preorders_count}</p>
            </div>
            {!isPreordersLoading && (
                <button
                    onClick={userHasPreordered ? handleRemovePreorder : handlePreorder}
                    disabled={isLoading}
                    className={`text-[16px] border rounded-lg py-1 px-3 h-7 ${
                        userHasPreordered ? 'bg-red-100 hover:bg-red-200' : 'bg-blue-100 hover:bg-blue-200'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Processing...' : userHasPreordered ? 'Cancel Preorder' : 'Preorder'}
                </button>
            )}
        </div>
    )
}
