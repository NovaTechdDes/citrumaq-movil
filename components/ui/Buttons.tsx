import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, useColorScheme } from 'react-native';

interface Props {
  type: 'edit' | 'delete' | 'add';
  funcion: () => void;
  disabled?: boolean;
  modalAbierto?: boolean;
}

const Buttons = ({ type, funcion, disabled, modalAbierto }: Props) => {
  const colorScheme = useColorScheme();

  if (type === 'edit') {
    {
      return (
        <Pressable onPress={funcion} className="border gap-3 w-[45%] justify-center bg-blue-600 border-blue-600 p-2 rounded-lg flex-row">
          <Ionicons name="create-outline" size={20} color="white" />
          <Text className="text-white">Editar</Text>
        </Pressable>
      );
    }
  }

  if (type === 'delete') {
    {
      return (
        <Pressable disabled={disabled} onPress={funcion} className="border gap-3 w-[45%] justify-center bg-red-600 border-red-600 p-2 rounded-lg flex-row">
          <Ionicons name="trash-outline" size={20} color="white" />
          <Text className="text-white">{disabled ? 'Eliminando...' : 'Eliminar'}</Text>
        </Pressable>
      );
    }
  }

  return (
    <Pressable onPress={funcion} className="border gap-3 w-[45%] justify-center bg-blue-600 border-blue-600 p-2 rounded-lg flex-row">
      {modalAbierto ? <Ionicons name="close-outline" size={20} color="white" /> : <Ionicons name="add-outline" size={20} color="white" />}
      <Text className="text-white">{modalAbierto ? 'Cerrar' : 'Agregar'}</Text>
    </Pressable>
  );
};

export default Buttons;
