import Header from '@/components/localidad/Header';
import LocalidadCard from '@/components/localidad/LocalidadCard';
import ModalLocalidad from '@/components/localidad/ModalLocalidad';
import { useLocalidades } from '@/hooks';
import { useLocalidadStore } from '@/presentation/store/useLocalidadStore';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Localidad = () => {
  const { modalAbierto } = useLocalidadStore();
  const { data: localidades, isLoading } = useLocalidades();

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-slate-950 items-center justify-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-slate-500 dark:text-slate-400 mt-4 font-medium">Sincronizando localidades...</Text>
      </SafeAreaView>
    );
  }

  if (modalAbierto) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
        <Header />
        <ModalLocalidad />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-950">
      <Header />

      <View className="flex-1">
        {localidades?.length === 0 ? (
          <SinLocalidades />
        ) : (
          <FlatList
            data={localidades}
            keyExtractor={(item, index) => (item.id_loc ? item.id_loc.toString() : index.toString())}
            renderItem={({ item }) => <LocalidadCard localidad={item} />}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, paddingTop: 10 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Localidad;

const SinLocalidades = () => {
  return (
    <View className="flex-1 items-center justify-center px-10">
      <View className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full items-center justify-center mb-4">
        <Ionicons name="location-outline" size={40} color="#94a3b8" />
      </View>
      <Text className="text-xl font-bold text-slate-900 dark:text-white text-center">Sin Localidades</Text>
      <Text className="text-slate-500 dark:text-slate-400 text-center mt-2">No se han encontrado registros de áreas. Comienza agregando una nueva localidad de trabajo.</Text>
    </View>
  );
};
