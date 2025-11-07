import { Maquina } from "@/core/interface/Maquina";
import { create } from 'zustand';

interface MaquinaStore {
    maquinaSeleccionada: Maquina | null;

    buscador: string | '';
    setBuscador: (texto: string) => void;

    modalAbierto: boolean;
    openModal: (maquina?: Maquina) => void;
    closeModal: () => void;
};

export const useMaquinaStore = create<MaquinaStore>((set) => ({
    maquinaSeleccionada: null,

    buscador: '',
    setBuscador: (texto) => set({
        buscador: texto
    }),

    modalAbierto: false,
    openModal: (maquina) => set({
        modalAbierto: true,
        maquinaSeleccionada: maquina ?? null
    }),
    closeModal: () => set({
        modalAbierto: false,
        maquinaSeleccionada: null
    })
}));
