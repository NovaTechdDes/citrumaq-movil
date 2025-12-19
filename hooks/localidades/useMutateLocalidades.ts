import { getLocalidades } from "@/core/actions/conexion.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutateLocalidades = () => {
  const queryClient = useQueryClient();

  const modificarLocalidad = useMutation({
    mutationFn: getLocalidades,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["localidades"] });
    },
  });

  return {
    modificarLocalidad,
  };
};
