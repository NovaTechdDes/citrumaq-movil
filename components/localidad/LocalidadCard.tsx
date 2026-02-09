import { Localidad } from '@/core/interface/Localidad';
import { useMutateLocalidades } from '@/hooks';
import { useLocalidadStore } from '@/presentation/store/useLocalidadStore';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native';

interface Props {
  localidad: Localidad;
}

const LocalidadCard = ({ localidad }: Props) => {
  const { openModal, setLocalidadSeleccinado } = useLocalidadStore();
  const { eliminarLocalidad } = useMutateLocalidades();
  const { mutateAsync: eliminar, isPending } = eliminarLocalidad;

  const handleEditarLocalidad = () => {
    setLocalidadSeleccinado(localidad);
    openModal();
  };

  const handleDeleteLocalidad = () => {
    Alert.alert('Eliminar Localidad', `¿Estás seguro de eliminar "${localidad.nombre_loc}"? Esta acción no se puede deshacer.`, [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          const { ok, message } = await eliminar(localidad.id_loc);
          if (!ok) {
            Alert.alert('Error de eliminación', message);
          }
        },
      },
    ]);
  };

  return (
    <View className="bg-white dark:bg-slate-900 mb-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
      <View className="flex-row items-center p-4">
        <View className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl items-center justify-center mr-4">
          <Ionicons name="map-outline" size={24} color="#10b981" />
        </View>

        <View className="flex-1">
          <Text className="text-lg font-bold text-slate-900 dark:text-white" numberOfLines={1}>
            {localidad.nombre_loc}
          </Text>
          <Text className="text-slate-400 dark:text-slate-500 text-xs font-mono uppercase tracking-widest">ID: {localidad.id_loc}</Text>
        </View>

        <View className="flex-row gap-2">
          <Pressable onPress={handleEditarLocalidad} className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full items-center justify-center active:bg-slate-100 dark:active:bg-slate-700">
            <Ionicons name="pencil-outline" size={18} color="#64748b" />
          </Pressable>

          <Pressable
            onPress={handleDeleteLocalidad}
            disabled={isPending}
            className="w-10 h-10 bg-rose-50 dark:bg-rose-900/20 rounded-full items-center justify-center active:bg-rose-100 dark:active:bg-rose-900/40"
          >
            {isPending ? <ActivityIndicator size="small" color="#f43f5e" /> : <Ionicons name="trash-outline" size={18} color="#f43f5e" />}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LocalidadCard;
