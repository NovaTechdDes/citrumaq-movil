import Actualizar from "@/components/sincronizar/Actualizar";
import Servidor from "@/components/sincronizar/Servidor";
import SincronizarDatos from "@/components/sincronizar/SincronizarDatos";
import Vendedor from "@/components/sincronizar/Vendedor";
import { Text, View } from "react-native";

const Sincronizar = () => {
  return (
    <View className="pt-10 px-2 dark:bg-black h-screen">
      <Text className="text-3xl font-bold mx-2 mt-1 dark:text-white">
        Sincronizar e Importar
      </Text>

      <Vendedor />

      <Servidor />

      <SincronizarDatos />

      <Actualizar />
    </View>
  );
};

export default Sincronizar;
