import { useLocalidadStore } from '@/presentation/store/useLocalidadStore';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

const Header = () => {
  const { openModal, modalAbierto, closeModal } = useLocalidadStore();
  return (
    <View className="flex-row justify-between items-center p-2">
      <Text className="text-2xl font-bold dark:text-white text-black">Mis Localidades</Text>

      <Pressable className="flex gap-2 flex-row rounded-lg px-2 bg-blue-600 py-1 items-center dark:bg-blue-700" onPress={() => (modalAbierto ? closeModal() : openModal())}>
        {modalAbierto ? <Ionicons name="close-outline" size={20} color="white" /> : <Ionicons name="add-outline" size={20} color="white" />}
        <Text className="text-xl text-white">{modalAbierto ? 'Cerrar' : 'Agregar'}</Text>
      </Pressable>
    </View>
  );
};

export default Header;
