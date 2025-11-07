import { getClientes } from "@/core/actions/cliente.actions";
import { useQuery } from "@tanstack/react-query";

export const useClientes = () => {
    return useQuery({
        queryKey: ['clientes'],
        queryFn: getClientes,
        staleTime: 1000 * 60 * 60
    });
};