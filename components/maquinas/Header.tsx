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
    <View className="flex-row justify-between items-center px-6 py-4">
      <View>
        <Text className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Inventario</Text>
        <Text className="text-slate-500 dark:text-slate-400 text-sm">Maquinaria y Equipos</Text>
      </View>

      <Buttons modalAbierto={modalAbierto} funcion={handleModal} type="add" />
    </View>
  );
};

export default Header;
