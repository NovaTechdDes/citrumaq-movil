import { Cliente } from "@/core/interface/Cliente";
import { useMutateClientes } from "@/hooks";
import { useClienteStore } from "@/presentation/store/useClienteStore";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, Pressable, Text, View } from "react-native";

interface Props {
  cliente: Cliente;
}

const ClienteCard = ({ cliente }: Props) => {
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
    <View className="border my-2 border-gray-500 rounded-lg py-2">
      <View className="gap-3 px-5 py-5">
        <View className="flex-row justify-between">
          <View className="flex-row items-center gap-2">
            <Ionicons
              name="person-outline"
              size={20}
              className="rounded-full p-2  bg-gray-300"
            />
            <Text className="text-black font-semibold text-xl">
              {denominacion}
            </Text>
          </View>
          <View className="flex flex-row gap-2">
            <Ionicons name="albums-outline" size={20} />
            <Text className="text-slate-600 text-lg">{documento}</Text>
          </View>
        </View>

        <View className="flex-row justify-between">
          <View className="flex flex-row gap-2 items-center">
            <Ionicons name="phone-portrait-outline" size={20} />
            <Text className="text-slate-600 text-lg">{telefono}</Text>
          </View>

          <View className="flex flex-row gap-2">
            <Ionicons name="home-outline" size={20} />
            <Text className="text-slate-600 text-lg">{domicilio}</Text>
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

        <View className="gap-16 flex-row w-full mt-5 justify-center">
          <Pressable
            onPress={handlePut}
            className="border w-[45%] justify-center border-gray-500 p-2 rounded-lg flex-row"
          >
            <Ionicons name="create-outline" size={20} />
            <Text>Editar</Text>
          </Pressable>

          {isPending ? (
            <View className="border border-gray-500 p-2 rounded-lg items-center justify-center">
              <Text className="text-red-500 text-xs">Eliminando...</Text>
            </View>
          ) : (
            <Pressable
              onPress={handleDelete}
              className="border w-[45%] justify-center border-red-500 bg-red-500 p-2 gap-5 rounded-lg flex-row"
            >
              <Ionicons name="trash-outline" size={20} color="white" />
              <Text className="text-white">Eliminar</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default ClienteCard;
