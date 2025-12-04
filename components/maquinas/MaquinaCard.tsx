import { Maquina } from "@/core/interface/Maquina";
import { useMutateMaquinas } from "@/hooks";
import { useMaquinaStore } from "@/presentation/store/useMaquinaStore";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, Pressable, Text, View } from "react-native";

interface Props {
  maquina: Maquina;
}

const MaquinaCard = ({ maquina }: Props) => {
  const {
    anio,
    descripcion,
    cliente,
    industria,
    marca,
    modelo,
    observacion_maquina,
  } = maquina;
  const { openModal, buscador } = useMaquinaStore();
  const { eliminarMaquina } = useMutateMaquinas();
  const { mutateAsync: eliminar, isPending } = eliminarMaquina;

  if (
    !maquina.descripcion.toUpperCase().startsWith(buscador) &&
    !maquina?.cliente?.toUpperCase().startsWith(buscador)
  )
    return;

  const handlePut = () => {
    console.log("a");
    openModal(maquina);
  };

  const handleDelete = () => {
    Alert.alert(
      "Eliminar",
      `Quiere eliminar la maquina ${maquina.descripcion} del cliente ${maquina.cliente}`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const retorno = await eliminar(maquina.id!);
          },
        },
      ]
    );
  };

  return (
    <View className="border my-2 border-gray-500 rounded-lg py-2">
      <View className="gap-3 px-5">
        <View className="flex-row justify-between items-center">
          <Text className="text-black font-semibold text-xl">
            {descripcion}
          </Text>
          <Text className="text-slate-500 font-semibold text-md">
            Cliente: {cliente}
          </Text>
        </View>

        <View className="flex flex-row justify-between gap-10">
          <View className="flex flex-row gap-2 items-center">
            <Ionicons name="cube-outline" size={20} />
            <View>
              <Text className="text-slate-600 text-lg">Marca</Text>
              <Text className="text-slate-900 text-lg">{marca}</Text>
            </View>
          </View>

          <View className="flex flex-row gap-2">
            <Ionicons name="folder-outline" size={20} />
            <View>
              <Text className="text-slate-600 text-lg">Modelo</Text>
              <Text className="text-slate-900 text-lg">{modelo}</Text>
            </View>
          </View>
        </View>

        <View className="flex flex-row justify-between gap-10">
          <View className="flex flex-row gap-2 items-center">
            <Ionicons name="calendar-clear-outline" size={20} />

            <View>
              <Text className="text-slate-600">Año</Text>
              <Text className="text-slate-900 text-lg">{anio}</Text>
            </View>
          </View>

          <View className="flex flex-row gap-2 items-center">
            <Ionicons name="storefront-outline" size={20} />

            <View>
              <Text className="text-slate-600">Industria</Text>
              <Text className="text-slate-900 text-lg">{industria}</Text>
            </View>
          </View>
        </View>

        {observacion_maquina !== "" && (
          <View className="border-l border-orange-400 pl-2">
            <Text className="font-bold text-orange-600 text-xl">
              Observacion
            </Text>
            <Text className="text-slate-600 text-lg">
              {observacion_maquina}
            </Text>
          </View>
        )}

        <View className="gap-16 flex-row  justify-center w-full mt-5">
          <Pressable
            onPress={handlePut}
            className="border border-gray-500 w-[45%] justify-center gap-2 p-2 rounded-lg flex-row"
          >
            <Ionicons name="create-outline" size={20} />
            <Text>Editar</Text>
          </Pressable>

          {isPending ? (
            <View className="border border-gray-500 p-2 rounded-lg  items-center justify-center">
              <Text className="text-red-500 text-xs">Eliminando...</Text>
            </View>
          ) : (
            <Pressable
              onPress={handleDelete}
              className="border w-[45%] justify-center gap-2 border-red-500 bg-red-500 p-2 rounded-lg flex-row"
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

export default MaquinaCard;
