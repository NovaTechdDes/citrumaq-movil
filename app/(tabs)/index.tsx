import ClienteCard from '@/components/clientes/ClienteCard';
import FormularioCliente from '@/components/clientes/FormularioCliente';
import Header from '@/components/clientes/Header';
import { useClientes } from '@/hooks';
import { useClienteStore } from '@/presentation/store/useClienteStore';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, FlatList, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { data: clientes, isLoading } = useClientes();
  const { modalAbierto, setBuscador, buscador } = useClienteStore();

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-slate-950 items-center justify-center">
        <ActivityIndicator size="large" color="#6366f1" />
        <Text className="text-slate-500 dark:text-slate-400 mt-4 font-medium">Cargando cartera de clientes...</Text>
      </SafeAreaView>
    );
  }

  if (modalAbierto) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
        <Header />
        <FormularioCliente />
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
            placeholder="Buscar por nombre o teléfono..."
            placeholderTextColor="#94a3b8"
            autoCapitalize="characters"
          />
        </View>
      </View>

      <View className="flex-1">
        {clientes?.length === 0 ? (
          <SinClientes />
        ) : (
          <FlatList
            data={clientes}
            keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
            renderItem={({ item }) => <ClienteCard cliente={item} />}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const SinClientes = () => {
  return (
    <View className="flex-1 items-center justify-center px-10">
      <View className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full items-center justify-center mb-6">
        <Ionicons name="people-outline" size={48} color="#94a3b8" />
      </View>
      <Text className="text-2xl font-bold text-slate-900 dark:text-white text-center">Cartera Vacía</Text>
      <Text className="text-slate-500 dark:text-slate-400 text-center mt-3 text-lg">No se han detectado clientes registrados. Comienza agregando uno para gestionar su maquinaria.</Text>
    </View>
  );
};
