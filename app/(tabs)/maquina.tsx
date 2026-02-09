import FormularioMaquina from '@/components/maquinas/FormularioMaquina';
import Header from '@/components/maquinas/Header';
import MaquinaCard from '@/components/maquinas/MaquinaCard';
import { useMaquinas } from '@/hooks';
import { useMaquinaStore } from '@/presentation/store/useMaquinaStore';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, FlatList, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Maquina() {
  const { data: maquinas, isLoading } = useMaquinas();
  const { modalAbierto, setBuscador, buscador } = useMaquinaStore();

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-slate-950 items-center justify-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-slate-500 dark:text-slate-400 mt-4 font-medium">Cargando inventario de máquinas...</Text>
      </SafeAreaView>
    );
  }

  if (modalAbierto) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
        <Header />
        <FormularioMaquina />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-950">
      <Header />

      <View className="px-6 mb-4">
        <View className="flex-row items-center bg-white dark:bg-slate-900 rounded-2xl px-4 h-14 shadow-sm border border-slate-100 dark:border-slate-800">
          <Ionicons name="search-outline" size={20} color="#94a3b8" />
          <TextInput
            onChangeText={(e) => setBuscador(e.toUpperCase())}
            value={buscador}
            className="flex-1 ml-3 text-slate-900 dark:text-white text-lg font-medium"
            placeholder="Buscar por equipo o cliente..."
            placeholderTextColor="#94a3b8"
            autoCapitalize="characters"
          />
        </View>
      </View>

      <View className="flex-1">
        {maquinas?.length === 0 ? (
          <SinMaquinas />
        ) : (
          <FlatList
            data={maquinas}
            keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
            renderItem={({ item }) => <MaquinaCard maquina={item} />}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const SinMaquinas = () => {
  return (
    <View className="flex-1 items-center justify-center px-10">
      <View className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full items-center justify-center mb-6">
        <Ionicons name="construct-outline" size={48} color="#94a3b8" />
      </View>
      <Text className="text-2xl font-bold text-slate-900 dark:text-white text-center">Inventario Vacío</Text>
      <Text className="text-slate-500 dark:text-slate-400 text-center mt-3 text-lg">No se han detectado máquinas cortadoras. Comienza registrando un nuevo equipo para el terminal.</Text>
    </View>
  );
};
