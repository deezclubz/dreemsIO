import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../../../app/axios'

export const useAddPreorder = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ productId }: { productId: number }) => apiClient.post(`/products/${productId}/preorder`),
        onSuccess: (_, variables) => {
            // Инвалидируем запрос предзаказов для этого продукта
            queryClient.invalidateQueries({
                queryKey: ['preorders', variables.productId]
            })
            // Также можно инвалидировать список продуктов если нужно
            queryClient.invalidateQueries({ queryKey: ['products'] })
        }
    })
}
