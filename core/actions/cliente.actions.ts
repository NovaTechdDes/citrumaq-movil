import { runSafeQuery } from '@/database/runSafeQuery';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cliente } from '../interface/Cliente';

export const getClientes = async (): Promise<Cliente[]> => {
  try {
    return await runSafeQuery(async (db) => {
      const filas = (await db.getAllAsync('SELECT c.*, l.nombre_loc FROM clientes c LEFT JOIN localidad l on c.localidad = l.id_loc ')) as Cliente[];
      return filas;
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const startAgregarCliente = async (cliente: Cliente): Promise<{ ok: boolean; message: string }> => {
  const vendedor = await AsyncStorage.getItem('vendedor');
  try {
    return await runSafeQuery(async (db) => {
      const res = await db.runAsync(`
    INSERT INTO clientes 
      (denominacion, domicilio, telefono, documento, localidad, observacion_cliente, id_vendedor, fecha_alta)
    VALUES ('
      ${cliente.denominacion}', '${cliente.domicilio}', '${cliente.telefono}',
      '${cliente.documento}','${cliente.localidad}','${cliente.observacion_cliente}', ${vendedor}, datetime('now'))`);

      if (res) {
        return {
          ok: true,
          message: 'Cliente agregado correctamente',
        };
      } else {
        return {
          ok: false,
          message: 'Error al agregar el cliente',
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

export const startDeleteCliente = async (id: number): Promise<{ ok: boolean; message: string }> => {
  try {
    return await runSafeQuery(async (db) => {
      const res = await db.runAsync('DELETE FROM clientes WHERE id = $id', {
        $id: id,
      });

      if (res) {
        return {
          ok: true,
          message: 'Cliente eliminado correctamente',
        };
      } else {
        return {
          ok: false,
          message: 'Error al eliminar el cliente',
        };
      }
    });
  } catch (error: any) {
    const errorMessage = error.message || '';

    if (errorMessage.includes('FOREIGN KEY constraint failed')) {
      return {
        ok: false,
        message: 'No se puede eliminar el cliente porque tiene registros relacionados en Maquinas',
      };
    }

    return {
      ok: false,
      message: 'Error al eliminar el cliente',
    };
  }
};

export const startPutCliente = async (cliente: Partial<Cliente>): Promise<{ ok: boolean; message: string }> => {
  try {
    return await runSafeQuery(async (db) => {
      if (!cliente.id) throw new Error('Id de cliente requerido para actualizar');

      const res = await db.runAsync(
        `UPDATE clientes SET 
              denominacion = $denominacion, 
              domicilio = $domicilio, 
              telefono = $telefono,
              localidad = $localidad,
              documento = $documento, 
              observacion_cliente = $observacion_cliente 
          WHERE id = $id`,
        {
          $denominacion: cliente.denominacion ?? '',
          $domicilio: cliente.domicilio ?? '',
          $telefono: cliente.telefono ?? '',
          $documento: cliente.documento ?? '',
          $localidad: cliente.localidad ?? '',
          $observacion_cliente: cliente.observacion_cliente ?? '',
          $id: cliente.id,
        }
      );

      if (res) {
        return {
          ok: true,
          message: 'cliente cargado con exito',
        };
      } else {
        return {
          ok: false,
          message: 'Error al cargar el cliente',
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
