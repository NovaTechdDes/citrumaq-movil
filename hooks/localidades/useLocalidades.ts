import { startObtenerLocalidades } from "@/core/actions/localidad.actions";
import { useQuery } from "@tanstack/react-query";

export const useLocalidades = () => {
  return useQuery({
    queryKey: ["localidades"],
    queryFn: () => startObtenerLocalidades(),
    staleTime: 1000 * 60 * 60,
  });
};
