import FormularioMaquina from "@/components/maquinas/FormularioMaquina";
import Header from "@/components/maquinas/Header";
import MaquinaCard from "@/components/maquinas/MaquinaCard";
import { useMaquinas } from "@/hooks";
import { useMaquinaStore } from "@/presentation/store/useMaquinaStore";
import { FlatList, Text, TextInput, View } from "react-native";

export default function Maquina() {
  const { data: maquinas } = useMaquinas();

  const { modalAbierto, closeModal, openModal, setBuscador } =
    useMaquinaStore();

  const handleModal = () => {
    if (modalAbierto) {
      closeModal();
    } else {
      openModal();
    }
  };

  if (maquinas?.length === 0) {
    return (
      <View className="px-2 rounded-lg py-10 h-screen">
        <Header />

        {modalAbierto && <FormularioMaquina />}
        <View className="border my-2 border-gray-500 rounded-lg py-2 dark:bg-slate-700">
          <Text className="p-2 text-center text-xl dark:text-slate-600">
            No hay maquinas registradas. ¡Agrega una para comenzar!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="px-2 pt-10 dark:bg-black h-screen rounded-lg">
      <Header />

      {modalAbierto && <FormularioMaquina />}

      <View className="my-3">
        <TextInput
          onChangeText={(e) => setBuscador(e.toUpperCase())}
          className="border placeholder:text-gray-500 border-gray-300 rounded-lg px-2 py-2 text-lg dark:border-gray-70 dark:text-white"
          placeholder="Buscar por maquina o cliente"
        />
      </View>

      <FlatList
        data={maquinas}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({ item }) => <MaquinaCard maquina={item} />}
        contentContainerStyle={{ paddingBottom: 90 }}
      />
    </View>
  );
}
