import { getMaquinas } from "@/core/actions/maquina.action"
import { useQuery } from "@tanstack/react-query"

export const useMaquinas = () => {
    return useQuery({
        queryKey: ['maquinas'],
        queryFn: getMaquinas,
        staleTime: 1000 * 60 * 60
    })
}