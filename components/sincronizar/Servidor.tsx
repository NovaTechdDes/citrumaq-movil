import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { probarConexion } from "@/core/actions/conexion.actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface URL {
  url: string;
}

const initialState: URL = {
  url: "",
};

const STORAGE_KEY = "@server_url";

const Servidor = () => {
  const { control, handleSubmit, setValue } = useForm<URL>({
    defaultValues: initialState,
  });
  const [loading, setLoading] = useState(false);
  const [loadingConexion, setLoadingConexion] = useState(false);
  const [conexion, setConexion] = useState<boolean>(false);
  const [bandera, setBandera] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setValue("url", saved);
      } catch (error) {
        console.warn("Error al leer URL guardada", error);
      }
    })();
  }, [setValue]);

  const handleConexion = async () => {
    setLoadingConexion(true);
    const { ok } = await probarConexion();

    if (ok) {
      setConexion(true);
    } else {
      setConexion(false);
    }
    setBandera(true);
    setLoadingConexion(false);

    setTimeout(() => {
      setBandera(false);
      setConexion(false);
    }, 3000);
  };

  const onSubmit = async (data: URL) => {
    setLoading(true);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, data.url);
      Alert.alert("Guardado", "La url fue guardada correctamente");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo guardar la URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      className="m-5 border border-gray-300 rounded-lg p-5 dark:bg-slate-700"
    >
      <Text className="text-2xl font-bold gap-5 dark:text-white">
        <Ionicons name="cog-outline" size={20} />
        <Text>Configurar Sevidor</Text>
      </Text>

      <Controller
        control={control}
        name="url"
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="mt-5">
            <Text className="text-xl font-bold mb-2 dark:text-white">
              URL del Servidor
            </Text>
            <TextInput
              onChangeText={onChange}
              placeholder="http://localhost:3000"
              onBlur={onBlur}
              keyboardType="url"
              autoCorrect={false}
              autoCapitalize="none"
              value={value}
              className="border rounded-lg px-2 border-gray-300 dark:text-white dark:placeholder:text-white"
            />
          </View>
        )}
      />

      <Pressable
        disabled={loading}
        onPress={handleSubmit(onSubmit)}
        className="bg-black rounded-lg mt-5 py-2"
      >
        <Text className="text-white text-center text-xl">
          {loading ? "Guardando..." : "Guardar Configuracion"}
        </Text>
      </Pressable>

      <Pressable
        onPress={handleConexion}
        className="bg-green-800 rounded-lg mt-5 py-2"
      >
        <Text className="text-white text-center text-xl">
          {loadingConexion ? "Conectando..." : "Probar conexion"}
        </Text>
      </Pressable>
      {conexion && bandera ? (
        <View className="flex-row items-center gap-2 mt-2">
          <Ionicons name="checkmark-circle-outline" size={25} color="green" />
          <Text className="text-green-800 text-center text-xl dark:text-white">
            Conexion Exitosa
          </Text>
        </View>
      ) : (
        bandera && (
          <View className="flex-row items-center gap-2 mt-2">
            <Ionicons name="close-circle-outline" size={25} color="red" />
            <Text className="text-red-800 text-center text-xl dark:text-white">
              Error al probar la conexion
            </Text>
          </View>
        )
      )}
    </KeyboardAvoidingView>
  );
};

export default Servidor;
