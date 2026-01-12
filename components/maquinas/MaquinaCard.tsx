import { Maquina } from '@/core/interface/Maquina';
import { useMutateMaquinas } from '@/hooks';
import { useMaquinaStore } from '@/presentation/store/useMaquinaStore';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Text, View } from 'react-native';
import Buttons from '../ui/Buttons';

interface Props {
  maquina: Maquina;
}

const MaquinaCard = ({ maquina }: Props) => {
  const { anio, descripcion, cliente, industria, marca, modelo, observacion_maquina } = maquina;
  const { openModal, buscador } = useMaquinaStore();
  const { eliminarMaquina } = useMutateMaquinas();
  const { mutateAsync: eliminar, isPending } = eliminarMaquina;

  if (!maquina.descripcion.toUpperCase().startsWith(buscador) && !maquina?.cliente?.toUpperCase().startsWith(buscador)) return;

  const handlePut = () => {
    openModal(maquina);
  };

  const handleDelete = () => {
    Alert.alert('Eliminar', `Quiere eliminar la maquina ${maquina.descripcion} del cliente ${maquina.cliente}`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          await eliminar(maquina.id!);
        },
      },
    ]);
  };

  return (
    <View className="border my-2 border-gray-500 rounded-lg py-2 dark:bg-black">
      <View className="gap-3 px-5">
        <View className="flex-row justify-between items-center">
          <Text className="text-black font-semibold text-xl dark:text-white">{descripcion}</Text>
          <Text className="text-slate-600 dark:text-white font-semibold text-lg">
            Cliente:
            <Text className="dark:text-white text-lg">{cliente?.trim()}</Text>
          </Text>
        </View>

        <View className="flex flex-row justify-between gap-10">
          <View className="flex flex-row gap-2 items-center w-[45%] dark:bg-slate-600   rounded-lg px-2">
            <Text className="dark:text-orange-500">
              <Ionicons name="cube-outline" size={20} />
            </Text>
            <View className=" p-2">
              <Text className="text-slate-600 text-lg dark:text-slate-300">Marca</Text>
              <Text className="text-slate-900 text-lg dark:text-white">{marca}</Text>
            </View>
          </View>

          <View className="flex flex-row gap-2 w-[45%] items-center  dark:bg-slate-600  rounded-lg px-2 ">
            <Text className="dark:text-orange-500">
              <Ionicons name="folder-outline" size={20} />
            </Text>
            <View>
              <Text className="text-slate-600 text-lg dark:text-slate-300">Modelo</Text>
              <Text className="text-slate-900 text-lg dark:text-white">{modelo}</Text>
            </View>
          </View>
        </View>

        <View className="flex flex-row justify-between gap-10">
          <View className="flex flex-row gap-2 items-center w-[45%] dark:bg-slate-600  rounded-lg px-2">
            <Text className="dark:text-orange-500">
              <Ionicons name="calendar-clear-outline" size={20} />
            </Text>

            <View>
              <Text className="text-slate-600 dark:text-slate-300">Año</Text>
              <Text className="text-slate-900 dark:text-white text-lg">{anio}</Text>
            </View>
          </View>

          <View className="flex flex-row gap-2 items-center w-[45%] dark:bg-slate-600  rounded-lg px-2">
            <Text className="dark:text-orange-500">
              <Ionicons name="storefront-outline" size={20} />
            </Text>

            <View>
              <Text className="text-slate-600 dark:text-slate-300">Industria</Text>
              <Text className="text-slate-900 dark:text-white text-lg">{industria}</Text>
            </View>
          </View>
        </View>

        {observacion_maquina !== '' && (
          <View className="border-l border-orange-400 pl-2 dark:bg-slate-600 rounded-lg p-2">
            <Text className="font-bold text-orange-600 text-xl dark:text-orange-600">Observacion</Text>
            <Text className="text-slate-600 text-lg dark:text-white">{observacion_maquina}</Text>
          </View>
        )}

        <View className="gap-16 flex-row  justify-center w-full mt-5">
          <Buttons funcion={handlePut} type="edit" />

          <Buttons funcion={handleDelete} type="delete" disabled={isPending} />
        </View>
      </View>
    </View>
  );
};

export default MaquinaCard;
