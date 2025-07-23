import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../../../app/axios'

export const useRemovePreorder = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ productId }: { productId: number }) => apiClient.delete(`/products/${productId}/preorder`),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['preorders', variables.productId]
            })
            queryClient.invalidateQueries({ queryKey: ['products'] })
        }
    })
}
