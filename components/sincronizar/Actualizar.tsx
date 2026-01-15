import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import { Alert, Pressable, Text, View } from 'react-native';

const Actualizar = () => {
  const version = Constants.expoConfig?.version;
  const handleActualizar = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        Alert.alert('Nueva Actualizacion', 'Hay una nueva version disponible, ¿Quieres actualizar?', [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Actualizar',
            style: 'default',
            onPress: async () => {
              await Updates.fetchUpdateAsync();
              await Updates.reloadAsync();
            },
          },
        ]);
      } else {
        Alert.alert('No hay actualizaciones disponibles');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la aplicacion');
    }
  };
  return (
    <View className="border border-gray-300 rounded-lg mx-5 p-2 mt-5 dark:bg-slate-700">
      <View className="flex-row items-center justify-center my-5 gap-5">
        <Text className="text-2xl font-bold dark:text-white">Actualizar Aplicacion</Text>
      </View>
      <Pressable className="flex-row items-center justify-center bg-blue-500 rounded-lg py-3 gap-5" onPress={handleActualizar}>
        <Ionicons name="cloud-upload-outline" color="white" size={25} />
        <Text className="text-2xl font-bold text-white">Actualizar</Text>
      </Pressable>

      <Text className="text-center mt-2 text-black dark:text-white">Version {version}</Text>
    </View>
  );
};

export default Actualizar;
