import { probarConexion } from "@/core/actions/conexion.actions";
import { useQuery } from "@tanstack/react-query";

export const useConexion = () => {
  return useQuery({
    queryKey: ["conexion"],
    queryFn: () => probarConexion(),
    staleTime: 0,
  });
};
