import { startAgregarLocalidad, startEliminarLocalidad, startModificarLocalidad } from '@/core/actions/localidad.actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutateLocalidades = () => {
  const queryClient = useQueryClient();

  const agregarLocalidad = useMutation({
    mutationFn: startAgregarLocalidad,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['localidades'] });
    },
  });

  const modificarLocalidad = useMutation({
    mutationFn: startModificarLocalidad,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['localidades'] });
    },
  });

  const eliminarLocalidad = useMutation({
    mutationFn: startEliminarLocalidad,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['localidades'] });
    },
  });

  return {
    agregarLocalidad,
    modificarLocalidad,
    eliminarLocalidad,
  };
};
