export interface Maquina {
    id?: number;
    descripcion: string;
    marca: string;
    modelo: string;
    anio: number;
    cliente?: string;
    industria: string;
    observacion_maquina: string;
    id_cliente?: number;
};