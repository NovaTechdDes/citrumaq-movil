import { runSafeQuery } from '@/database/runSafeQuery';
import { Localidad } from '../interface/Localidad';

export const startObtenerLocalidades = async () => {
  try {
    return await runSafeQuery(async (db) => {
      const filas = (await db.getAllAsync('SELECT * FROM localidad')) as Localidad[];
      return filas;
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const startAgregarLocalidad = async (localidad: Localidad): Promise<{ ok: boolean; message: string }> => {
  try {
    return await runSafeQuery(async (db) => {
      const res = await db.runAsync('INSERT INTO localidad (nombre_loc) VALUES ($nombre_loc)', {
        $nombre_loc: localidad.nombre_loc,
      });
      if (res.changes > 0) {
        return {
          ok: true,
          message: 'Localdiad Agregada correctamente',
        };
      } else {
        return {
          ok: false,
          message: 'Error al agregar la localidad',
        };
      }
    });
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      message: error.message,
    };
  }
};

export const startModificarLocalidad = async (localidad: Localidad): Promise<{ ok: boolean; message: string }> => {
  try {
    return await runSafeQuery(async (db) => {
      const res = await db.runAsync('UPDATE localidad SET nombre_loc = $nombre_loc WHERE id_loc = $id_loc', {
        $nombre_loc: localidad.nombre_loc ?? '',
        $id_loc: localidad.id_loc ?? 0,
      });
      if (res.changes > 0) {
        return {
          ok: true,
          message: 'Localidad actualizada correctamente',
        };
      } else {
        return {
          ok: false,
          message: 'Error al actualizar la localidad',
        };
      }
    });
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      message: error.message,
    };
  }
};

export const startEliminarLocalidad = async (id: number): Promise<{ ok: boolean; message: string }> => {
  try {
    return await runSafeQuery(async (db) => {
      const res = await db.runAsync('DELETE FROM localidad WHERE id_loc = $id_loc', {
        $id_loc: id,
      });
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
    });
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
