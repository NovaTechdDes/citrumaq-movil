import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

const Actualizar = () => {
  return (
    <View className="border border-gray-300 rounded-lg mx-5 p-2 mt-5">
      <View className="flex-row items-center justify-center my-5 gap-5">
        <Text className="text-2xl font-bold">Actualizar Aplicacion</Text>
      </View>
      <Pressable className="flex-row items-center justify-center bg-blue-500 rounded-lg py-3 gap-5">
        <Ionicons name="cloud-upload-outline" color="white" size={25} />
        <Text className="text-2xl font-bold text-white">Actualizar</Text>
      </Pressable>
    </View>
  );
};

export default Actualizar;
