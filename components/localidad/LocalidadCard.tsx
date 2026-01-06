import { Localidad } from '@/core/interface/Localidad';
import { useMutateLocalidades } from '@/hooks';
import { useLocalidadStore } from '@/presentation/store/useLocalidadStore';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, Text, View } from 'react-native';

interface Props {
  localidad: Localidad;
}

const LocalidadCard = ({ localidad }: Props) => {
  const { openModal, setLocalidadSeleccinado } = useLocalidadStore();
  const { eliminarLocalidad } = useMutateLocalidades();
  const { mutateAsync: eliminar, isPending } = eliminarLocalidad;

  const handleEditarLocalidad = () => {
    openModal();
    setLocalidadSeleccinado(localidad);
  };

  const handleDeleteLocalidad = () => {
    Alert.alert('Eliminar localidad', '¿Estas seguro de eliminar esta localidad?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Eliminar',
        onPress: async () => {
          const { ok, message } = await eliminar(localidad.id_loc);

          if (!ok) {
            Alert.alert('Error', message);
          }
        },
      },
    ]);
  };

  return (
    <View className="border my-2 border-gray-500 rounded-lg py-2 dark:bg-slate-700 px-5">
      <View className="flex-row items-center gap-5 border-b border-gray-500">
        <View className="flex-col items-center">
          <Ionicons name="location-outline" size={24} color="green" />
        </View>
        <View className="flex-col">
          <Text className="text-center text-3xl dark:text-white">{localidad.nombre_loc}</Text>
          <Text className="text-center text-xl dark:text-slate-400">#ID: {localidad.id_loc}</Text>
        </View>
      </View>

      <View className="gap-16 flex-row w-full pt-5 px-5 justify-center">
        <Pressable onPress={handleEditarLocalidad} className="flex-row items-center gap-2 dark:bg-black dark:border dark:border-gray-500 p-2 rounded-lg dark:text-white w-[45%] justify-center">
          <Text className="text-black dark:text-white">
            <Ionicons name="create-outline" size={20} />
          </Text>
          <Text className="text-black dark:text-white">Editar</Text>
        </Pressable>
        <Pressable
          onPress={handleDeleteLocalidad}
          disabled={isPending}
          className="flex-row items-center gap-2 dark:bg-black dark:border dark:border-gray-500 p-2 rounded-lg dark:text-white w-[45%] justify-center"
        >
          <Text className="text-white dark:text-red-500">
            <Ionicons name="trash-outline" size={20} />
          </Text>
          <Text className="text-white dark:text-red-500">{isPending ? 'Eliminando...' : 'Eliminar'}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LocalidadCard;
