import { useLocalidadStore } from '@/presentation/store/useLocalidadStore';
import { Text, View } from 'react-native';
import Buttons from '../ui/Buttons';

const Header = () => {
  const { openModal, modalAbierto, closeModal } = useLocalidadStore();
  return (
    <View className="flex-row justify-between items-center p-2">
      <Text className="text-2xl font-bold dark:text-white text-black">Mis Localidades</Text>

      <Buttons modalAbierto={modalAbierto} funcion={() => (modalAbierto ? closeModal() : openModal())} type="add" />
    </View>
  );
};

export default Header;
