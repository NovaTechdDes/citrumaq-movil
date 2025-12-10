import { db } from "./db";

export const setupDatabase = async () => {
  const conexion = await db();
  await conexion.execAsync("PRAGMA foreign_keys = ON");

  conexion.execAsync(
    `CREATE TABLE IF NOT EXISTS clientes (
                id integer primary key autoincrement,
                denominacion text,
                domicilio text,
                telefono text,
                documento text,
                observacion_cliente blob,
                id_vendedor integer
            )
        `
  );

  conexion.execAsync(
    `CREATE TABLE IF NOT EXISTS maquinas (
            id integer primary key autoincrement,
            descripcion text not null,
            marca text,
            modelo text,
            anio integer,
            industria text,
            observacion_maquina blob,
            id_cliente integer REFERENCES clientes(id)
            
            
            )`
  );
};
