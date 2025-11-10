import { db } from "@/database/db";
import { Maquina } from "../interface/Maquina";

export const getMaquinas = async (): Promise<Maquina[]> => {
    const conexion = await db();
    const filas = await conexion.getAllAsync(`
        SELECT 
            m.*, 
            c.denominacion as cliente 
        FROM maquinas m
        LEFT JOIN clientes c ON m.id_cliente = c.id
    `) as (Maquina & { cliente?: string })[];
    return filas;
};

export const startAgregarMaquina = async (maquina: Maquina): Promise<boolean> => {
    const conexion = await db();

    const res = await conexion.runAsync(`
        INSERT INTO maquinas (descripcion, marca, modelo, anio, industria, observacion_maquina, id_cliente)
        VALUES ('${maquina.descripcion}', '${maquina.marca}', '${maquina.modelo}', ${Number(maquina.anio)}, '${maquina.industria}', '${maquina.observacion_maquina}', ${maquina.id_cliente})`)

    if (res) {
        return true;
    } else {
        return false;
    };
};

export const startPutMaquina = async (maquina: Partial<Maquina>): Promise<boolean> => {
    const conexion = await db();
    if (!maquina.id) throw new Error("Id de maquina requerido para actualizar");

    const res = await conexion.runAsync(
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
        return true;
    } else {
        return false;
    };
};


export const startDeleteMaquina = async (id: number): Promise<boolean> => {
    const conexion = await db();

    try {
        const res = await conexion.runAsync('DELETE FROM maquinas WHERE id = $id', { $id: id });
        // res.changes indica la cantidad de filas afectadas por la sentencia
        if (res?.changes && res.changes > 0) {
            return true;
        } else {
            // No se eliminó ninguna fila (posiblemente id no existe)
            return false;
        }
    } catch (error) {
        console.error("Error eliminando la máquina:", error);
        return false;
    }
};