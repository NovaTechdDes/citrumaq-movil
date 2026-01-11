import { runSafeQuery } from '@/database/runSafeQuery';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Cliente } from '../interface/Cliente';
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
  return runSafeQuery(async (db) => {
    const filasClientes = (await db.getAllAsync('SELECT * FROM clientes left join localidad on clientes.localidad = localidad.id_loc')) as Cliente[];

    const filasMaquinas = (await db.getAllAsync('SELECT * FROM maquinas')) as Maquina[];

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
        msg: 'Error al enviar los datos',
      };
    }
  });
};
