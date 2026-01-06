import { db } from '@/database/db';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Cliente } from '../interface/Cliente';
import { Localidad } from '../interface/Localidad';
import { Maquina } from '../interface/Maquina';

const getServerUrl = async () => {
  return await AsyncStorage.getItem('@server_url');
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
      msg: 'Error al probar la conexion',
    };
  }
};

export const enviarDatos = async () => {
  const url = await getServerUrl();
  const conexion = await db();

  const filasLocalidades = (await conexion.getAllAsync('SELECT * FROM localidad')) as Localidad[];

  const filasClientes = (await conexion.getAllAsync('SELECT * FROM clientes left join localidad on clientes.localidad = localidad.id_loc')) as Cliente[];

  const filasMaquinas = (await conexion.getAllAsync('SELECT * FROM maquinas')) as Maquina[];
  const datos = {
    localidades: filasLocalidades,
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
      msg: 'Error al enviar los datos',
    };
  }
};
