import { startAgregarCliente, startDeleteCliente, startPutCliente } from "@/core/actions/cliente.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutateClientes = () => {
    const queryClient = useQueryClient();

    const agregarCliente = useMutation({
        mutationFn: startAgregarCliente,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clientes'] })
        }

    });

    const modificarCliente = useMutation({
        mutationFn: startPutCliente,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clientes'] })
        }
    })

    const eliminarCliente = useMutation({
        mutationFn: startDeleteCliente,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clientes'] })
        }
    });


    return {
        agregarCliente,
        modificarCliente,
        eliminarCliente
    }
}