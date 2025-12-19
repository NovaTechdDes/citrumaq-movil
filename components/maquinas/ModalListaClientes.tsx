import { Cliente } from '@/core/interface/Cliente';
import { FlatList, Modal, TextInput } from 'react-native';

import { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListaClientes from './ListaClientes';

interface Props {
  open: boolean;
  clientes: Cliente[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectCliente: React.Dispatch<React.SetStateAction<number>>;
  onChange: ReactNode;
}

const ModalListaClientes = ({ clientes, setOpen, setSelectCliente, open, onChange }: Props) => {
  return (
    <Modal visible={open} animationType="slide">
      <SafeAreaView className="dark:bg-gray-800">
        <TextInput placeholder="Buscar Clientes..." className="border m-3 p-3 rounded-lg dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:border-gray-400" />
        <FlatList
          data={clientes}
          className="h-screen"
          keyExtractor={({ id }) => id?.toString() ?? new Date().getTime().toString()}
          renderItem={({ item }) => <ListaClientes closeModal={setOpen} {...item} setSelectCliente={setSelectCliente} onChange={onChange} />}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default ModalListaClientes;
