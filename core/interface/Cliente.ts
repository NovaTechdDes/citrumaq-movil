export interface Cliente {
    id?: number;
    denominacion: string;
    domicilio: string;
    telefono: string;
    documento: string;
    observacion_cliente?: string;
}