import { useMaquinaStore } from '@/presentation/store/useMaquinaStore';
import { Text, View } from 'react-native';
import Buttons from '../ui/Buttons';

const Header = () => {
  const { openModal, closeModal, modalAbierto } = useMaquinaStore();

  const handleModal = () => {
    if (modalAbierto) {
      closeModal();
    } else {
      openModal();
    }
  };
  return (
    <View className="flex-row justify-between items-center p-2 ">
      <Text className="text-2xl font-semibold dark:text-white text-black">Mis Maquinas</Text>

      <Buttons modalAbierto={modalAbierto} funcion={handleModal} type="add" />
    </View>
  );
};

export default Header;
