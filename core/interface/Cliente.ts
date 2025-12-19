export interface Cliente {
  id?: number;
  denominacion: string;
  domicilio: string;
  telefono: string;
  localidad: string;
  documento: string;
  nombre_loc?: string;
  observacion_cliente?: string;
}
