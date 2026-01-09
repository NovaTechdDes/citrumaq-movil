import { Cliente } from '@/core/interface/Cliente';
import { useMutateClientes } from '@/hooks';
import { useColorScheme } from '@/hooks/use-color-scheme.web';
import { useClienteStore } from '@/presentation/store/useClienteStore';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Text, View } from 'react-native';
import Buttons from '../ui/Buttons';

interface Props {
  cliente: Cliente;
}

const ClienteCard = ({ cliente }: Props) => {
  const colorScheme = useColorScheme();

  const { denominacion, documento, domicilio, telefono, observacion_cliente, nombre_loc } = cliente;
  const { openModal, buscador } = useClienteStore();
  const { eliminarCliente } = useMutateClientes();
  const { mutateAsync: eliminar, isPending } = eliminarCliente;

  if (!cliente.denominacion.toUpperCase().includes(buscador) && !cliente.telefono.toUpperCase().startsWith(buscador)) return;

  const handlePut = () => {
    openModal(cliente);
  };

  const handleDelete = () => {
    if (!cliente.id) return;

    Alert.alert('Eliminar', `Quiere eliminar el cliente ${cliente.denominacion}`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          const { ok, message } = await eliminar(cliente?.id!);

          if (!ok) {
            Alert.alert('Error: ', message);
          }
        },
      },
    ]);
  };

  return (
    <View className={`border my-2 border-gray-500 rounded-lg py-2 ${colorScheme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <View className="gap-3 px-5 py-5">
        <View className="flex-col justify-center items-center">
          <View className="flex-row w-full p-3 items-center gap-2">
            <View className="flex flex-row items-center dark:text-[#6d65fe] dark:bg-[#6d65fe] rounded-lg p-2">
              <Text className="capitalize">{denominacion.trim()[0]}</Text>
              <Text className="capitalize">{denominacion.trim()[1]}</Text>
            </View>

            <Text className={`text-black font-semibold text-xl ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>{denominacion.trim()}</Text>
          </View>
        </View>

        <View className="flex-row justify-center gap-5 dark:bg-slate-800">
          <View className="gap-2 flex-row  w-[45%] p-2 rounded-lg">
            <View className="flex-row gap-2 items-center  rounded-lg ">
              <Ionicons name="albums-outline" size={20} color="violet" />
            </View>
            <View>
              <Text className="dark:text-slate-300">Documento</Text>
              <Text className={`text-slate-600 text-xl font-semibold dark:text-white`}>{documento}</Text>
            </View>
          </View>

          <View className="gap-2 flex-row  w-[45%] p-2 rounded-lg">
            <View className="flex-row gap-2 items-center">
              <Ionicons name="location-outline" size={20} color="violet" />
            </View>
            <View>
              <Text className="dark:text-slate-300">Localidad</Text>
              <Text className={`text-slate-600 text-xl font-semibold dark:text-white`}>{nombre_loc}</Text>
            </View>
          </View>
        </View>

        <View className="flex-row justify-center gap-5 dark:bg-slate-800">
          <View className="gap-2 flex-row  w-[45%] p-2 rounded-lg">
            <View className="flex-row gap-2 items-center">
              <Ionicons name="phone-portrait-outline" size={20} color="violet" className="dark:text-slate-300" />
            </View>
            <View>
              <Text className="dark:text-slate-300">Teléfono</Text>
              <Text className={`text-slate-600 text-xl font-semibold dark:text-white`}>{telefono}</Text>
            </View>
          </View>

          <View className="gap-2 flex-row w-[45%] p-2 rounded-lg">
            <View className="flex-row gap-2 items-center">
              <Ionicons name="home-outline" size={20} color="violet" />
            </View>
            <View>
              <Text className="dark:text-slate-300">Domicilio</Text>
              <Text className={`text-slate-600 text-xl font-semibold dark:text-white`}>{domicilio}</Text>
            </View>
          </View>
        </View>

        {observacion_cliente && (
          <View className="border-l border-orange-300 pl-3">
            <Text className="text-xl font-bold text-orange-500">Observaciones</Text>
            <Text className="text-lg">{observacion_cliente}</Text>
          </View>
        )}

        <View className="gap-16 flex-row w-full mt-5 border-t border-gray-500 pt-5 px-5 justify-center">
          <Buttons funcion={handlePut} type="edit" />

          <Buttons funcion={handleDelete} type="delete" disabled={isPending} />
        </View>
      </View>
    </View>
  );
};

export default ClienteCard;
