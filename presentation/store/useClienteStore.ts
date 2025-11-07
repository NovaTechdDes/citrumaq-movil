import { Cliente } from "@/core/interface/Cliente";
import { create } from 'zustand';
interface ClienteStore {
    clienteSeleccionado: Cliente | null;
    setClienteSeleccionado: (cliente: Cliente) => void;

    buscador: string;
    setBuscador: (texto: string) => void;

    modalAbierto: boolean;
    openModal: (cliente?: Cliente) => void;
    closeModal: () => void;
};


export const useClienteStore = create<ClienteStore>((set) => ({
    clienteSeleccionado: null,
    setClienteSeleccionado: (cliente) => set({ clienteSeleccionado: cliente }),

    buscador: '',
    setBuscador: (texto) => set({
        buscador: texto
    }),

    modalAbierto: false,
    openModal: (cliente) => set({
        modalAbierto: true,
        clienteSeleccionado: cliente
    }),
    closeModal: () => set({
        modalAbierto: false,
        clienteSeleccionado: null
    })
}));