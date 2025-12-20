import { Localidad } from '@/core/interface/Localidad';
import { create } from 'zustand';

interface LocalidadStore {
  localidadSeleccinado: Localidad | null;
  setLocalidadSeleccinado: (localidad: Localidad) => void;

  buscador: string;
  setBuscador: (texto: string) => void;

  modalAbierto: boolean;
  openModal: (localidad?: Localidad) => void;
  closeModal: () => void;
}

export const useLocalidadStore = create<LocalidadStore>((set) => ({
  localidadSeleccinado: null,
  setLocalidadSeleccinado: (localidad) => set({ localidadSeleccinado: localidad }),

  buscador: '',
  setBuscador: (texto) => set({ buscador: texto }),

  modalAbierto: false,
  openModal: (localidad) =>
    set({
      modalAbierto: true,
      localidadSeleccinado: localidad,
    }),
  closeModal: () => set({ modalAbierto: false }),
}));
