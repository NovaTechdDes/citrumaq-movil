import { enviarDatos } from '@/core/actions/conexion.actions';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native';

const SincronizarDatos = () => {
  const [loading, setLoading] = useState(false);
  const handlePress = async () => {
    setLoading(true);
    try {
      const { ok, msg } = await enviarDatos();
      if (ok) {
        Alert.alert('Sincronización Exitosa', msg);
      } else {
        Alert.alert('Fallo en Sincronización', msg);
      }
    } catch {
      Alert.alert('Error de Sistema', 'Ocurrió un error inesperado al intentar sincronizar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="mx-6 my-3 p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-md border border-slate-100 dark:border-slate-800">
      <View className="flex-row items-center mb-6">
        <View className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl items-center justify-center mr-4">
          <Ionicons name="sync" size={24} color="#6366f1" />
        </View>
        <View>
          <Text className="text-xl font-bold text-slate-900 dark:text-white">Sincronización Local</Text>
          <Text className="text-slate-500 dark:text-slate-400 text-sm">Subida de Clientes y Máquinas</Text>
        </View>
      </View>

      <View className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 mb-6">
        <View className="flex-row items-start gap-3">
          <Ionicons name="information-circle-outline" size={18} color="#94a3b8" />
          <Text className="text-slate-600 dark:text-slate-400 text-sm leading-5 pr-4">Esta acción enviará todos los registros pendientes de clientes y maquinaria capturados en el terminal.</Text>
        </View>
      </View>

      <Pressable
        disabled={loading}
        onPress={handlePress}
        className={`h-14 rounded-2xl flex-row items-center justify-center gap-3 ${loading ? 'bg-slate-200 dark:bg-slate-700' : 'bg-indigo-600 active:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none'}`}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" size="small" />
        ) : (
          <>
            <Ionicons name="cloud-upload" size={20} color="white" />
            <Text className="text-white text-lg font-bold">Iniciar Sincronización</Text>
          </>
        )}
      </Pressable>
    </View>
  );
};

export default SincronizarDatos;
