import { useLocalidadStore } from '@/presentation/store/useLocalidadStore';
import { Text, View } from 'react-native';
import Buttons from '../ui/Buttons';

const Header = () => {
  const { openModal, modalAbierto, closeModal } = useLocalidadStore();
  return (
    <View className="flex-row justify-between items-center px-6 py-4">
      <View>
        <Text className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Localidades</Text>
        <Text className="text-slate-500 dark:text-slate-400 text-sm">Gestión de centros de trabajo</Text>
      </View>

      <Buttons modalAbierto={modalAbierto} funcion={() => (modalAbierto ? closeModal() : openModal())} type="add" />
    </View>
  );
};

export default Header;
