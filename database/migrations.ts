import { db } from './db';

export const setupDatabase = async () => {
  const conexion = await db();
  await conexion.execAsync('PRAGMA foreign_keys = ON');

  // Primero creamos localidad porque clientes depende de ella
  await conexion.execAsync(
    `CREATE TABLE IF NOT EXISTS localidad (
            id_loc integer primary key autoincrement,
            nombre_loc text unique
            )`
  );

  await conexion.execAsync(
    `CREATE TABLE IF NOT EXISTS clientes (
                id integer primary key autoincrement,
                denominacion text,
                domicilio text,
                telefono text,
                localidad integer REFERENCES localidad(id_loc),
                documento text,
                observacion_cliente text,
                id_vendedor integer,
                fecha_alta DATE DEFAULT CURRENT_DATE
            )
        `
  );

  // Migración: Verificar si existen las columnas nuevas

  const clientesInfo = (await conexion.getAllAsync('PRAGMA table_info(clientes)')) as any[];

  const hasLocalidad = clientesInfo.some((col) => col.name === 'localidad');
  if (!hasLocalidad) {
    await conexion.execAsync('ALTER TABLE clientes ADD COLUMN localidad text REFERENCES localidad(id_loc)');
    console.log('✅ Columna localidad agregada a clientes');
  }

  const hasFechaAlta = clientesInfo.some((col) => col.name === 'fecha_alta');
  if (!hasFechaAlta) {
    await conexion.execAsync('ALTER TABLE clientes ADD COLUMN fecha_alta DATE DEFAULT CURRENT_DATE');
    console.log('✅ Columna fecha_alta agregada a clientes');
  }

  await conexion.execAsync(
    `CREATE TABLE IF NOT EXISTS maquinas (
            id integer primary key autoincrement,
            descripcion text not null,
            marca text,
            modelo text,
            anio integer,
            industria text,
            observacion_maquina text,
            id_cliente integer REFERENCES clientes(id)
            
            
            )`
  );
};
