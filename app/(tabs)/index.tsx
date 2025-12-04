import ClienteCard from "@/components/clientes/ClienteCard";
import FormularioCliente from "@/components/clientes/FormularioCliente";
import Header from "@/components/clientes/Header";

import { useClientes } from "@/hooks";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useClienteStore } from "@/presentation/store/useClienteStore";
import { ScrollView, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  const { data: clientes } = useClientes();
  const { modalAbierto, setBuscador } = useClienteStore();

  if (clientes?.length === 0) {
    return (
      <View
        className={`px-2 rounded-lg py-10 h-screen ${colorScheme === "dark" ? "bg-black" : "bg-white"}`}
      >
        <Header />

        {modalAbierto && <FormularioCliente />}
        <View
          className={`border my-2 border-gray-500 rounded-lg py-2 ${colorScheme === "dark" ? "bg-slate-700" : "bg-white"}`}
        >
          <Text
            className={`p-2 text-center text-xl ${colorScheme === "dark" ? "text-white" : "text-slate-600"}`}
          >
            No hay clientes registrados. ¡Agrega uno para comenzar!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="px-2 py-10 dark:bg-black h-screen rounded-lg">
      <Header />

      {modalAbierto && <FormularioCliente />}

      <View className="mt-2 border rounded-lg border-slate-500">
        <TextInput
          className="placeholder:text-gray-400 dark:text-white"
          placeholder="Buscar el cliente por nombre, telefono"
          onChangeText={(e) => setBuscador(e.toUpperCase())}
        />
      </View>

      <ScrollView
        className="gap-5 mt-5"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32"
      >
        {clientes?.map((cliente) => (
          <ClienteCard key={cliente.id?.toString()} cliente={cliente} />
        ))}
      </ScrollView>
    </View>
  );
}
