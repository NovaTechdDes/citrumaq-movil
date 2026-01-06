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

export const startEliminarLocalidad = async (id: number): Promise<{ ok: boolean; message: string }> => {
  const conexion = await db();
  try {
    const res = await conexion.runAsync('DELETE FROM localidad WHERE id_loc = $id_loc', {
      $id_loc: id,
    });
    console.log(res);
    if (res.changes > 0) {
      return {
        ok: true,
        message: 'Localidad eliminada correctamente',
      };
    } else {
      return {
        ok: false,
        message: 'Error al eliminar la localidad',
      };
    }
  } catch (error: any) {
    console.error(error);

    const errorMessage = error.message || '';

    if (errorMessage.includes('FOREIGN KEY constraint failed')) {
      return {
        ok: false,
        message: 'No se puede eliminar la localidad porque tiene registros relacionados en Clientes',
      };
    }

    return {
      ok: false,
      message: 'Error al eliminar la localidad',
    };
  }
};
