import { db } from "@/database/db";
import { Localidad } from "../interface/Localidad";

export const startObtenerLocalidades = async () => {
  const conexion = await db();

  try {
    const filas = (await conexion.getAllAsync(
      "SELECT * FROM localidad"
    )) as Localidad[];
    return filas;
  } catch (error) {
    console.error(error);
    return [];
  }
};
