import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { useClienteStore } from "@/presentation/store/useClienteStore";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const Header = () => {
  const { openModal, closeModal, modalAbierto } = useClienteStore();
  const colorScheme = useColorScheme();
  const handleModal = () => {
    if (modalAbierto) {
      closeModal();
    } else {
      openModal();
    }
  };
  return (
    <View className={`flex-row justify-between items-center p-2`}>
      <Text className={`text-2xl font-semibold dark:text-white`}>
        Mis Clientes
      </Text>

      <Pressable
        onPress={handleModal}
        className={`flex gap-2 flex-row rounded-lg px-2 bg-blue-600 dark:bg-blue-700 py-1 items-center `}
      >
        {!modalAbierto && (
          <Ionicons name="add-outline" size={20} color="white" />
        )}
        <Text className="text-xl text-white">
          {modalAbierto ? "Cerrar" : "Agregar"}
        </Text>
      </Pressable>
    </View>
  );
};

export default Header;
