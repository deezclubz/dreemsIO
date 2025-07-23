import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../app/axios'

export const requestFunction = async () => {
    const { data } = await apiClient.get('/products')
    return data
}

export const useProducts = () => {
    return useQuery({ queryKey: ['products'], queryFn: requestFunction })
}
