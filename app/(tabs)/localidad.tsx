import Header from '@/components/localidad/Header';
import LocalidadCard from '@/components/localidad/LocalidadCard';
import ModalLocalidad from '@/components/localidad/ModalLocalidad';
import { useLocalidades } from '@/hooks';
import { useLocalidadStore } from '@/presentation/store/useLocalidadStore';
import { FlatList, Text, View } from 'react-native';

const Localidad = () => {
  const { modalAbierto } = useLocalidadStore();
  const { data: localidades, isLoading } = useLocalidades();

  if (isLoading) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (modalAbierto) {
    return (
      <View className="px-2 rounded-lg py-10 h-screen dark:bg-black">
        <Header />
        <ModalLocalidad />
      </View>
    );
  }

  return (
    <View className="px-2 rounded-lg py-10 h-screen dark:bg-black">
      <Header />

      {localidades?.length === 0 ? (
        <SinLocalidades />
      ) : (
        <FlatList
          data={localidades}
          keyExtractor={(item, index) => (item.id_loc ? item.id_loc.toString() : index.toString())}
          renderItem={({ item }) => <LocalidadCard localidad={item} />}
          contentContainerStyle={{ paddingBottom: 90 }}
        />
      )}
    </View>
  );
};

export default Localidad;

const SinLocalidades = () => {
  return (
    <View className="border my-2 border-gray-500 rounded-lg py-2 dark:bg-slate-700">
      <Text className="p-2 text-center text-xl dark:text-slate-300">No hay Localidades registradas. ¡Agregar una para comenzar!</Text>
    </View>
  );
};
