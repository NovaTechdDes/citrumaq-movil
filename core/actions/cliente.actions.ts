import { db } from "@/database/db";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Cliente } from "../interface/Cliente";
export const getClientes = async (): Promise<Cliente[]> => {
  const conexion = await db();

  const filas = (await conexion.getAllAsync(
    "SELECT * FROM clientes"
  )) as Cliente[];
  return filas;
};

export const startAgregarCliente = async (
  cliente: Cliente
): Promise<boolean> => {
  const vendedor = await AsyncStorage.getItem("vendedor");
  const conexion = await db();
  const res = await conexion.runAsync(`INSERT INTO clientes 
        (denominacion, domicilio, telefono, documento, observacion_cliente, id_vendedor) VALUES ('${cliente.denominacion}', '${cliente.domicilio}', '${cliente.telefono}', '${cliente.documento}','${cliente.observacion_cliente}', ${vendedor})`);

  if (res) {
    return true;
  } else {
    return false;
  }
};

export const startDeleteCliente = async (id: number): Promise<boolean> => {
  const conexion = await db();
  const res = await conexion.runAsync("DELETE FROM clientes WHERE id = $id", {
    $id: id,
  });
  console.log(res);
  if (res) {
    return true;
  } else {
    return false;
  }
};

export const startPutCliente = async (
  cliente: Partial<Cliente>
): Promise<boolean> => {
  const conexion = await db();
  if (!cliente.id) throw new Error("Id de cliente requerido para actualizar");

  const res = await conexion.runAsync(
    `UPDATE clientes SET 
            denominacion = $denominacion, 
            domicilio = $domicilio, 
            telefono = $telefono, 
            documento = $documento, 
            observacion_cliente = $observacion_cliente 
        WHERE id = $id`,
    {
      $denominacion: cliente.denominacion ?? "",
      $domicilio: cliente.domicilio ?? "",
      $telefono: cliente.telefono ?? "",
      $documento: cliente.documento ?? "",
      $observacion_cliente: cliente.observacion_cliente ?? "",
      $id: cliente.id,
    }
  );

  if (res) {
    return true;
  } else {
    return false;
  }
};
