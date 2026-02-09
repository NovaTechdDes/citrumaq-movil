import { useClienteStore } from '@/presentation/store/useClienteStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Text, View } from 'react-native';
import Buttons from '../ui/Buttons';

const Header = () => {
  const { openModal, closeModal, modalAbierto } = useClienteStore();

  const handleModal = async () => {
    if (modalAbierto) {
      closeModal();
    } else {
      const vendedor = await AsyncStorage.getItem('vendedor');

      if (vendedor === '0' || !vendedor) {
        Alert.alert('Acceso Restringido', 'El Código de Vendedor no ha sido configurado. Por favor, realiza la configuración inicial.');
        return;
      }

      openModal();
    }
  };

  return (
    <View className="flex-row justify-between items-center px-6 py-4">
      <View>
        <Text className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Cartera</Text>
        <Text className="text-slate-500 dark:text-slate-400 text-sm">Gestión de Clientes</Text>
      </View>

      <Buttons modalAbierto={modalAbierto} funcion={handleModal} type="add" />
    </View>
  );
};

export default Header;
