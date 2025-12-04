import Actualizar from "@/components/sincronizar/Actualizar";
import Servidor from "@/components/sincronizar/Servidor";
import SincronizarDatos from "@/components/sincronizar/SincronizarDatos";
import React from "react";
import { Text, View } from "react-native";

const Sincronizar = () => {
  return (
    <View>
      <Text className="text-3xl font-bold mx-2 mt-1">
        Sincronizar e Importar
      </Text>

      <Servidor />

      <SincronizarDatos />

      <Actualizar />
    </View>
  );
};

export default Sincronizar;
