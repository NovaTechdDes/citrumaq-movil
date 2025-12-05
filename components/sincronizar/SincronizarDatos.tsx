import { enviarDatos } from "@/core/actions/conexion.actions";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

const SincronizarDatos = () => {
  const [loading, setLoading] = useState(false);
  const handlePress = async () => {
    setLoading(true);
    const { ok, msg } = await enviarDatos();

    if (ok) {
      Alert.alert(msg);
    } else {
      Alert.alert("Error", msg);
    }
    setLoading(false);
  };

  return (
    <View className="border border-gray-300 rounded-lg mx-5 p-2 dark:bg-slate-700">
      <View className="flex-row gap-5 items-center ">
        <Text className="text-2xl font-bold dark:text-white">
          <Ionicons name="cloud-upload-outline" size={25} />
        </Text>
        <Text className="text-2xl font-bold dark:text-white">
          Sincronizar Datos
        </Text>
      </View>

      <Pressable
        className="bg-black rounded-lg py-3 mt-5 flex-row items-center justify-center gap-5"
        onPress={handlePress}
      >
        <Ionicons name="cloud-upload-outline" size={25} color="white" />
        <Text className="text-white text-xl  text-center">
          {loading ? "Sincronizando" : "Enviar Datos"}
        </Text>
      </Pressable>
      <Text className="mt-5 text-gray-900 text-xl dark:text-white">
        Enviar clientes y maquinas al servidor
      </Text>
    </View>
  );
};

export default SincronizarDatos;
