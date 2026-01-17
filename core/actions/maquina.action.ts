import { getDb } from '@/database/db';
import { Maquina } from '../interface/Maquina';

export const getMaquinas = async (): Promise<Maquina[]> => {
  const db = await getDb();
  try {
    const filas = (await db.getAllAsync(`
            SELECT 
                m.*, 
                c.denominacion as cliente 
            FROM maquinas m
            LEFT JOIN clientes c ON m.id_cliente = c.id
        `)) as (Maquina & { cliente?: string })[];
    return filas;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const startAgregarMaquina = async (maquina: Maquina): Promise<{ ok: boolean; message: string }> => {
  const db = await getDb();
  try {
    const res = await db.runAsync(`
        INSERT INTO maquinas (descripcion, marca, modelo, anio, industria, observacion_maquina, id_cliente)
        VALUES ('${maquina.descripcion}', '${maquina.marca}', '${maquina.modelo}', ${Number(maquina.anio)}, '${maquina.industria}', '${maquina.observacion_maquina}', ${maquina.id_cliente})`);

    if (res) {
      return {
        ok: true,
        message: 'Maquina agregada correctamente',
      };
    } else {
      return {
        ok: false,
        message: 'Error al agregar la maquina',
      };
    }
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error.message,
    };
  }
};

export const startPutMaquina = async (maquina: Partial<Maquina>): Promise<{ ok: boolean; message: string }> => {
  const db = await getDb();
  try {
    if (!maquina.id) throw new Error('Id de maquina requerido para actualizar');

    const res = await db.runAsync(
      `UPDATE maquinas SET 
            descripcion = $descripcion,
            marca = $marca,
            modelo = $modelo,
            anio = $anio,
            industria = $industria,
            observacion_maquina = $observacion_maquina,
            id_cliente = $id_cliente
        WHERE id = $id`,
      {
        $descripcion: maquina.descripcion ?? '',
        $marca: maquina.marca ?? '',
        $modelo: maquina.modelo ?? '',
        $anio: maquina.anio ?? 0,
        $industria: maquina.industria ?? 0,
        $observacion_maquina: maquina.observacion_maquina ?? '',
        $id_cliente: maquina.id_cliente ?? null,
        $id: maquina.id,
      }
    );
    if (res) {
      return {
        ok: true,
        message: 'Maquina modificada correctamente',
      };
    } else {
      return {
        ok: false,
        message: 'Error al modificar la maquina',
      };
    }
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error.message,
    };
  }
};

export const startDeleteMaquina = async (id: number): Promise<{ ok: boolean; message: string }> => {
  const db = await getDb();
  try {
    const res = await db.runAsync('DELETE FROM maquinas WHERE id = $id', { $id: id });
    // res.changes indica la cantidad de filas afectadas por la sentencia
    if (res?.changes && res.changes > 0) {
      return {
        ok: true,
        message: 'Maquina Eliminado correctamente',
      };
    } else {
      // No se eliminó ninguna fila (posiblemente id no existe)
      return {
        ok: false,
        message: 'No se pudo eliminar maquina',
      };
    }
  } catch (error) {
    console.error('Error eliminando la máquina:', error);
    return {
      ok: false,
      message: 'Error al eliminar la maquina',
    };
  }
};
