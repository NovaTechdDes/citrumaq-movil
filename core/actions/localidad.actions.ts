import { db } from '@/database/db';
import { Localidad } from '../interface/Localidad';

export const startObtenerLocalidades = async () => {
  const conexion = await db();

  try {
    const filas = (await conexion.getAllAsync('SELECT * FROM localidad')) as Localidad[];
    return filas;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const startAgregarLocalidad = async (localidad: Localidad): Promise<boolean> => {
  const conexion = await db();
  try {
    const res = await conexion.runAsync('INSERT INTO localidad (nombre_loc) VALUES ($nombre_loc)', {
      $nombre_loc: localidad.nombre_loc,
    });
    if (res.changes > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const startModificarLocalidad = async (localidad: Localidad): Promise<boolean> => {
  const conexion = await db();
  try {
    const res = await conexion.runAsync('UPDATE localidad SET nombre_loc = $nombre_loc WHERE id_loc = $id_loc', {
      $nombre_loc: localidad.nombre_loc ?? '',
      $id_loc: localidad.id_loc ?? 0,
    });
    if (res.changes > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const startEliminarLocalidad = async (id: number): Promise<boolean> => {
  const conexion = await db();
  try {
    const res = await conexion.runAsync('DELETE FROM localidad WHERE id_loc = $id_loc', {
      $id_loc: id,
    });
    if (res.changes > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
