import { Maquina } from '@/core/interface/Maquina';
import { useMutateMaquinas } from '@/hooks';
import { useMaquinaStore } from '@/presentation/store/useMaquinaStore';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native';

interface Props {
  maquina: Maquina;
}

const MaquinaCard = ({ maquina }: Props) => {
  const { anio, descripcion, cliente, industria, marca, modelo, observacion_maquina } = maquina;
  const { openModal, buscador } = useMaquinaStore();
  const { eliminarMaquina } = useMutateMaquinas();
  const { mutateAsync: eliminar, isPending } = eliminarMaquina;

  if (buscador && !descripcion.toUpperCase().includes(buscador) && !cliente?.toUpperCase().includes(buscador)) {
    return null;
  }

  const handlePut = () => {
    openModal(maquina);
  };

  const handleDelete = () => {
    Alert.alert('Eliminar Equipo', `¿Estás seguro de eliminar la máquina "${descripcion}" asociada al cliente ${cliente}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          const { ok, message } = await eliminar(maquina.id!);
          if (!ok) Alert.alert('Error', message);
        },
      },
    ]);
  };

  return (
    <View className="bg-white dark:bg-slate-900 mb-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Header de la Tarjeta */}
      <View className="p-5 border-b border-slate-50 dark:border-slate-800">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1 mr-4">
            <Text className="text-xl font-bold text-slate-900 dark:text-white leading-7">{descripcion}</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="person-circle-outline" size={14} color="#6366f1" />
              <Text className="text-indigo-600 dark:text-indigo-400 font-bold text-xs ml-1 uppercase tracking-tighter">{cliente?.trim() || 'SIN CLIENTE ASIGNADO'}</Text>
            </View>
          </View>

          <Pressable
            onPress={handleDelete}
            disabled={isPending}
            className="w-10 h-10 bg-rose-50 dark:bg-rose-900/20 rounded-full items-center justify-center active:bg-rose-100 dark:active:bg-rose-900/40"
          >
            {isPending ? <ActivityIndicator size="small" color="#f43f5e" /> : <Ionicons name="trash-outline" size={18} color="#f43f5e" />}
          </Pressable>
        </View>
      </View>

      {/* Grid de Especificaciones Técnicas */}
      <View className="p-5 bg-slate-50/50 dark:bg-slate-800/20">
        <View className="flex-row flex-wrap">
          <SpecItem icon="pricetag-outline" label="Marca" value={marca} />
          <SpecItem icon="settings-outline" label="Modelo" value={modelo} />
          <SpecItem icon="calendar-outline" label="Año" value={String(anio)} />
          <SpecItem icon="business-outline" label="Industria" value={industria} />
        </View>

        {observacion_maquina !== '' && (
          <View className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/30">
            <View className="flex-row items-center mb-1">
              <Ionicons name="alert-circle-outline" size={16} color="#d97706" />
              <Text className="text-amber-700 dark:text-amber-500 font-bold text-xs ml-1">OBSERVACIONES</Text>
            </View>
            <Text className="text-slate-600 dark:text-slate-400 text-sm leading-5">{observacion_maquina}</Text>
          </View>
        )}
      </View>

      {/* Botón de Edición Inferior */}
      <Pressable
        onPress={handlePut}
        className="h-14 bg-white dark:bg-slate-900 items-center justify-center flex-row border-t border-slate-50 dark:border-slate-800 active:bg-slate-50 dark:active:bg-slate-800/50"
      >
        <Ionicons name="create-outline" size={18} color="#64748b" />
        <Text className="text-slate-600 dark:text-slate-400 font-bold ml-2">EDITAR ESPECIFICACIONES</Text>
      </Pressable>
    </View>
  );
};

const SpecItem = ({ icon, label, value }: { icon: any; label: string; value: string }) => (
  <View className="w-1/2 flex-row items-center mb-4 pr-2">
    <View className="w-8 h-8 bg-white dark:bg-slate-800 rounded-lg items-center justify-center shadow-xs mr-3 border border-slate-100 dark:border-slate-700">
      <Ionicons name={icon} size={16} color="#64748b" />
    </View>
    <View className="flex-1">
      <Text className="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-bold tracking-wider">{label}</Text>
      <Text className="text-slate-800 dark:text-slate-200 text-sm font-semibold" numberOfLines={1}>
        {value || '---'}
      </Text>
    </View>
  </View>
);

export default MaquinaCard;
