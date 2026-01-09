import { Localidad } from '@/core/interface/Localidad';
import { useMutateLocalidades } from '@/hooks';
import { useLocalidadStore } from '@/presentation/store/useLocalidadStore';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Text, View } from 'react-native';
import Buttons from '../ui/Buttons';

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
        <Buttons funcion={handleEditarLocalidad} type="edit" />
        <Buttons funcion={handleDeleteLocalidad} type="delete" disabled={isPending} />
      </View>
    </View>
  );
};

export default LocalidadCard;
