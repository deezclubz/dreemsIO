import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../app/axios'

export const fetchPreorders = async (productId: number) => {
    const { data } = await apiClient.get(`/products/${productId}/preorder/status`)
    return data
}

export const useGetPreorders = (productId: number) => {
    return useQuery({
        queryKey: ['preorders', productId],
        queryFn: () => fetchPreorders(productId),
        enabled: !!productId // Запрос выполнится только если передан productId
    })
}
