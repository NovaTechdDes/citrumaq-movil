import { db } from "@/database/db";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Cliente } from "../interface/Cliente";
import { Localidad } from "../interface/Localidad";
import { Maquina } from "../interface/Maquina";

const getServerUrl = async () => {
  return await AsyncStorage.getItem("@server_url");
};

export const probarConexion = async () => {
  const url = await getServerUrl();

  try {
    const { data } = await axios.get(`${url}citrumaq`, { timeout: 1000 });
    return data;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      msg: "Error al probar la conexion",
    };
  }
};

export const enviarDatos = async () => {
  const url = await getServerUrl();
  const conexion = await db();

  const filasClientes = (await conexion.getAllAsync(
    "SELECT * FROM clientes"
  )) as Cliente[];

  const filasMaquinas = (await conexion.getAllAsync(
    "SELECT * FROM maquinas"
  )) as Maquina[];

  const datos = {
    clientes: filasClientes,
    maquinas: filasMaquinas,
  };
  try {
    const { data } = await axios.post(`${url}citrumaq/sincronizacion`, datos);
    return data;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      msg: "Error al enviar los datos",
    };
  }
};

export const getLocalidades = async () => {
  const url = await getServerUrl();

  try {
    const { data } = await axios.get(`${url}citrumaq/localidad`, {
      timeout: 1000,
    });

    for (let elem of data.localidad) {
      await actualizarLocalidad(elem);
    }

    return {
      ok: true,
      msg: "Localidades actualizadas",
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      msg: "Error al obtener las localidades desde el servidor",
    };
  }
};

const actualizarLocalidad = async (localidad: Localidad) => {
  const conexion = await db();

  const localidadExistente = await conexion.getFirstAsync(
    `SELECT * FROM localidad WHERE id_loc = ${localidad.id_loc} LIMIT 1`
  );

  if (localidadExistente) {
    const res = await conexion.runAsync(
      `UPDATE localidad SET nombre_loc = '${localidad.nombre_loc}' WHERE id_loc = ${localidad.id_loc}`
    );
    if (res) {
      return true;
    } else {
      return false;
    }
  }

  const res = await conexion.runAsync(
    `INSERT INTO localidad (id_loc, nombre_loc) values (${localidad.id_loc}, '${localidad.nombre_loc}')`
  );

  if (res) {
    return true;
  } else {
    return false;
  }
};
