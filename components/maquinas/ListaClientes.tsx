import { Pressable, Text } from 'react-native';

interface Props {
  id?: number;
  denominacion: string;
  localidad: string;
  telefono: string;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectCliente: React.Dispatch<React.SetStateAction<number>>;
  onChange: (id: number) => void;
}

const ListaClientes = ({ id, denominacion, localidad, telefono, closeModal, setSelectCliente, onChange }: Props) => {
  return (
    <Pressable
      onPress={() => {
        setSelectCliente(id ?? 0);
        onChange(id ?? 0);
        closeModal(false);
      }}
      className="p-4 border-b dark:border-gray-600 dark:bg-gray-800 w-full flex-row gap-5 justify-center items-center"
    >
      <Text className="font-semibold dark:text-white text-xl">
        {denominacion} - {localidad} - {telefono}
      </Text>
    </Pressable>
  );
};

export default ListaClientes;
