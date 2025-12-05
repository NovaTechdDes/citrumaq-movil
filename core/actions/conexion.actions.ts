import { db } from "@/database/db";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Cliente } from "../interface/Cliente";
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
