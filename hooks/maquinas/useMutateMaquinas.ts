
import { startAgregarMaquina, startDeleteMaquina, startPutMaquina } from "@/core/actions/maquina.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutateMaquinas = () => {

    const queryClient = useQueryClient();


    const agregarMaquina = useMutation({
        mutationFn: startAgregarMaquina,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['maquinas'] });
        }
    });


    const modificarMaquina = useMutation({
        mutationFn: startPutMaquina,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['maquinas'] });
        }
    });

    const eliminarMaquina = useMutation({
        mutationFn: startDeleteMaquina,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['maquinas'] });
        }
    });



    return {
        agregarMaquina,
        modificarMaquina,
        eliminarMaquina
    }
}