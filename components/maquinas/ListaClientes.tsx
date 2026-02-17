import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

interface Props {
  id?: number;
  denominacion: string;
  nombre_loc?: string; // Corregido: antes decía 'localidad' en la prop pero se usa nombre_loc en el sistema
  telefono: string;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectCliente: React.Dispatch<React.SetStateAction<number>>;
  onChange: (id: number) => void;
}

const ListaClientes = ({ id, denominacion, nombre_loc, telefono, closeModal, setSelectCliente, onChange }: Props) => {
  console.log(denominacion);
  return (
    <Pressable
      onPress={() => {
        setSelectCliente(id ?? 0);
        onChange(id ?? 0);
        closeModal(false);
      }}
      className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex-row items-center active:bg-slate-50 dark:active:bg-slate-900"
    >
      <View className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full items-center justify-center mr-4">
        <Ionicons name="person-outline" size={18} color="#64748b" />
      </View>

      <View className="flex-1">
        <Text className="text-lg font-bold text-slate-900 dark:text-white" numberOfLines={1}>
          {denominacion.trim()}
        </Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-slate-500 dark:text-slate-400 text-xs font-medium">{nombre_loc || 'Sin Localidad'}</Text>
          <Text className="text-slate-300 dark:text-slate-600 mx-2">•</Text>
          <Text className="text-slate-500 dark:text-slate-400 text-xs font-medium">{telefono}</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
    </Pressable>
  );
};

export default ListaClientes;
