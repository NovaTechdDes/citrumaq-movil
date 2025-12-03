import { db } from "@/database/db";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Cliente } from "../interface/Cliente";

const getServerUrl = async () => {
  return await AsyncStorage.getItem("@server_url");
};

export const probarConexion = async () => {
  const url = await getServerUrl();
  const { data } = await axios.get(`${url}citrumaq`);
  return data;
};

export const enviarClientes = async () => {
  const url = await getServerUrl();
  const conexion = await db();

  const filas = (await conexion.getAllAsync(
    "SELECT * FROM clientes"
  )) as Cliente[];

  console.log(filas);

  const { data } = await axios.post(
    `${url}citrumaq/clientes/variosClientes`,
    filas
  );
  console.log(data);
};
