import { Cliente } from '@/core/interface/Cliente';
import { FlatList, Modal, TextInput } from 'react-native';

import { useEffect, useState } from 'react';
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
    const clientesFiltrados = clientes.filter((cliente) => cliente.nombre_loc?.toLowerCase().includes(search.toLowerCase()) || cliente.denominacion.toLowerCase().includes(search.toLowerCase()));
    setClientesFiltrados(clientesFiltrados);
  }, [search]);

  return (
    <Modal visible={open} animationType="slide">
      <SafeAreaView className="dark:bg-gray-800">
        <TextInput
          placeholder="Buscar Clientes por nombre o localidad"
          onChangeText={(e) => setSearch(e)}
          className="border m-3 p-3 rounded-lg dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:border-gray-400"
        />
        <FlatList
          data={clientesFiltrados}
          className="h-screen"
          keyExtractor={({ id }) => id?.toString() ?? new Date().getTime().toString()}
          renderItem={({ item }) => <ListaClientes closeModal={setOpen} {...item} setSelectCliente={setSelectCliente} onChange={onChange} />}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default ModalListaClientes;
