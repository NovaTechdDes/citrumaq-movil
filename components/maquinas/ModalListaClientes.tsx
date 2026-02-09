import { Cliente } from '@/core/interface/Cliente';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListaClientes from './ListaClientes';

interface Props {
  open: boolean;
  clientes: Cliente[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectCliente: React.Dispatch<React.SetStateAction<number>>;
  onChange: (id: number) => void;
}

const ModalListaClientes = ({ clientes, setOpen, setSelectCliente, open, onChange }: Props) => {
  const [search, setSearch] = useState<string>('');
  const [clientesFiltrados, setClientesFiltrados] = useState<Cliente[]>(clientes);

  useEffect(() => {
    const filtrados = clientes.filter((cliente) => cliente.nombre_loc?.toLowerCase().includes(search.toLowerCase()) || cliente.denominacion.toLowerCase().includes(search.toLowerCase()));
    setClientesFiltrados(filtrados);
  }, [search, clientes]);

  return (
    <Modal visible={open} animationType="slide">
      <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-950">
        <View className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-2xl font-bold text-slate-900 dark:text-white">Seleccionar Cliente</Text>
            <Pressable onPress={() => setOpen(false)} className="w-10 h-10 items-center justify-center">
              <Ionicons name="close" size={24} color="#94a3b8" />
            </Pressable>
          </View>

          <View className="flex-row items-center bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 h-12">
            <Ionicons name="search-outline" size={18} color="#94a3b8" />
            <TextInput
              placeholder="Buscar por nombre o ubicación..."
              placeholderTextColor="#94a3b8"
              onChangeText={setSearch}
              value={search}
              className="flex-1 ml-2 text-slate-900 dark:text-white font-medium"
            />
          </View>
        </View>

        <FlatList
          data={clientesFiltrados}
          keyExtractor={({ id }) => id?.toString() ?? Math.random().toString()}
          renderItem={({ item }) => <ListaClientes closeModal={setOpen} {...item} setSelectCliente={setSelectCliente} onChange={onChange} />}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default ModalListaClientes;
