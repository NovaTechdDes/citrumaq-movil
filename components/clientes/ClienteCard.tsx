import { Cliente } from "@/core/interface/Cliente";
import { useMutateClientes } from "@/hooks";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { useClienteStore } from "@/presentation/store/useClienteStore";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Pressable, Text, View } from "react-native";

interface Props {
  cliente: Cliente;
}

const ClienteCard = ({ cliente }: Props) => {
  const colorScheme = useColorScheme();

  const { denominacion, documento, domicilio, telefono, observacion_cliente } =
    cliente;
  const { openModal, buscador } = useClienteStore();
  const { eliminarCliente } = useMutateClientes();
  const { mutateAsync: eliminar, isPending } = eliminarCliente;

  if (
    !cliente.denominacion.toUpperCase().startsWith(buscador) &&
    !cliente.telefono.toUpperCase().startsWith(buscador)
  )
    return;

  const handlePut = () => {
    openModal(cliente);
  };

  const handleDelete = () => {
    if (!cliente.id) return;

    Alert.alert(
      "Eliminar",
      `Quiere eliminar el cliente ${cliente.denominacion}`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => eliminar(cliente?.id!),
        },
      ]
    );
  };

  return (
    <View
      className={`border my-2 border-gray-500 rounded-lg py-2 ${colorScheme === "dark" ? "bg-slate-800" : "bg-white"}`}
    >
      <View className="gap-3 px-5 py-5">
        <View className="flex-col justify-center items-center">
          <View className="flex-row w-full p-3 items-center gap-2">
            <Text className="text-blue-500 dark:bg-slate-700 p-2 rounded-lg">
              <Ionicons name="person-outline" size={20} />
            </Text>

            <Text
              className={`text-black font-semibold text-xl ${colorScheme === "dark" ? "text-white" : "text-black"}`}
            >
              {denominacion}
            </Text>
          </View>

          <View className="flex w-full dark:bg-slate-700 p-3 rounded-lg">
            <View className="flex-row gap-2 items-center">
              <Text className="dark:text-blue-500">
                <Ionicons name="albums-outline" size={20} />
              </Text>
              <Text className="dark:text-slate-300">Documento</Text>
            </View>
            <Text
              className={`text-slate-600 text-xl font-semibold dark:text-white`}
            >
              {documento}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-center gap-5 dark:bg-slate-700">
          <View className="gap-2  w-[45%] p-2 rounded-lg">
            <View className="flex-row gap-2 items-center">
              <Text className="dark:text-blue-500">
                <Ionicons name="phone-portrait-outline" size={20} />
              </Text>
              <Text className="dark:text-slate-300">Teléfono</Text>
            </View>
            <Text
              className={`text-slate-600 text-xl font-semibold dark:text-white`}
            >
              {telefono}
            </Text>
          </View>

          <View className="gap-2 w-[45%] p-2 rounded-lg">
            <View className="flex-row gap-2 items-center">
              <Text className="dark:text-blue-500">
                <Ionicons name="home-outline" size={20} />
              </Text>
              <Text className="dark:text-slate-300">Domicilio</Text>
            </View>
            <Text
              className={`text-slate-600 text-xl font-semibold dark:text-white`}
            >
              {domicilio}
            </Text>
          </View>
        </View>

        {observacion_cliente && (
          <View className="border-l border-orange-300 pl-3">
            <Text className="text-xl font-bold text-orange-500">
              Observaciones
            </Text>
            <Text className="text-lg">{observacion_cliente}</Text>
          </View>
        )}

        <View className="gap-16 flex-row w-full mt-5 border-t border-gray-500 pt-5 px-5 justify-center">
          <Pressable
            onPress={handlePut}
            className="border w-[45%] justify-center border-gray-500 p-2 rounded-lg flex-row"
          >
            <Ionicons
              name="create-outline"
              size={20}
              color={colorScheme === "dark" ? "white" : "black"}
            />
            <Text className="dark:text-white">Editar</Text>
          </Pressable>

          {isPending ? (
            <View className="border border-gray-500 p-2 rounded-lg items-center justify-center">
              <Text className="text-red-500 text-xs">Eliminando...</Text>
            </View>
          ) : (
            <Pressable
              onPress={handleDelete}
              className="w-[45%] justify-center  bg-red-500 p-2 gap-5 rounded-lg flex-row dark:bg-slate-700  "
            >
              <Text className="dark:text-red-500 text-white">
                <Ionicons name="trash-outline" size={20} />
              </Text>
              <Text className="text-white dark:text-red-500">Eliminar</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default ClienteCard;
