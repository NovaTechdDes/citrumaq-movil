import { Cliente } from '@/core/interface/Cliente';
import { useMutateClientes } from '@/hooks';
import { useClienteStore } from '@/presentation/store/useClienteStore';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native';

interface Props {
  cliente: Cliente;
}

const ClienteCard = ({ cliente }: Props) => {
  const { denominacion, documento, domicilio, telefono, observacion_cliente, nombre_loc } = cliente;
  const { openModal, buscador } = useClienteStore();
  const { eliminarCliente } = useMutateClientes();
  const { mutateAsync: eliminar, isPending } = eliminarCliente;

  if (buscador && !denominacion.toUpperCase().includes(buscador) && !telefono.toUpperCase().includes(buscador)) {
    return null;
  }

  const handlePut = () => {
    openModal(cliente);
  };

  const handleDelete = () => {
    if (!cliente.id) return;

    Alert.alert('Eliminar Cliente', `¿Estás seguro de eliminar a "${denominacion}"? Esta acción no se puede deshacer.`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          const { ok, message } = await eliminar(cliente.id!);
          if (!ok) Alert.alert('Error', message);
        },
      },
    ]);
  };

  const initial = denominacion.trim().charAt(0).toUpperCase();

  return (
    <View className="bg-white dark:bg-slate-900 mb-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Header de la Tarjeta */}
      <View className="p-5 border-b border-slate-50 dark:border-slate-800">
        <View className="flex-row items-center">
          <View className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl items-center justify-center mr-4">
            <Text className="text-indigo-600 dark:text-indigo-400 font-extrabold text-xl">{initial}</Text>
          </View>

          <View className="flex-1 mr-2">
            <Text className="text-xl font-bold text-slate-900 dark:text-white leading-7" numberOfLines={1}>
              {denominacion.trim()}
            </Text>
            <View className="flex-row items-center mt-1">
              <View className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md">
                <Text className="text-slate-500 dark:text-slate-400 font-bold text-[10px] tracking-widest uppercase">ID: {documento}</Text>
              </View>
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

      {/* Grid de Información de Contacto */}
      <View className="p-5 bg-slate-50/50 dark:bg-slate-800/20">
        <View className="flex-row flex-wrap">
          <InfoItem icon="call-outline" label="Teléfono" value={telefono} />
          <InfoItem icon="location-outline" label="Localidad" value={nombre_loc} />
          <InfoItem icon="home-outline" label="Domicilio" value={domicilio} fullWidth />
        </View>

        {observacion_cliente && (
          <View className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/30">
            <View className="flex-row items-center mb-1">
              <Ionicons name="journal-outline" size={14} color="#d97706" />
              <Text className="text-amber-700 dark:text-amber-500 font-bold text-[10px] ml-1 uppercase tracking-wider">Notas Internas</Text>
            </View>
            <Text className="text-slate-600 dark:text-slate-400 text-sm leading-5">{observacion_cliente}</Text>
          </View>
        )}
      </View>

      {/* Botón de Perfil Inferior */}
      <Pressable
        onPress={handlePut}
        className="h-14 bg-white dark:bg-slate-900 items-center justify-center flex-row border-t border-slate-50 dark:border-slate-800 active:bg-slate-50 dark:active:bg-slate-800/50"
      >
        <Ionicons name="create-outline" size={18} color="#64748b" />
        <Text className="text-slate-600 dark:text-slate-400 font-bold ml-2">EDITAR INFORMACIÓN</Text>
      </Pressable>
    </View>
  );
};

const InfoItem = ({ icon, label, value, fullWidth = false }: { icon: any; label: string; value: string | undefined; fullWidth?: boolean }) => (
  <View className={`${fullWidth ? 'w-full mt-2' : 'w-1/2'} flex-row items-center mb-4 pr-2`}>
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

export default ClienteCard;
