import { Tabs } from "expo-router";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "dark"].background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Clientes",
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: verColor(focused, colorScheme!), fontSize: 12 }}
            >
              Clientes
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="people-outline"
              color={verColor(focused, colorScheme!)}
              size={25}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="maquina"
        options={{
          title: "Maquinas",
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: verColor(focused, colorScheme!), fontSize: 12 }}
            >
              Maquinas
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="build-outline"
              size={25}
              color={verColor(focused, colorScheme!)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sincronizar"
        options={{
          title: "Sincronizar",
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: verColor(focused, colorScheme!), fontSize: 12 }}
            >
              Sincronizar
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="share-social-outline"
              size={25}
              color={verColor(focused, colorScheme!)}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const verColor = (focused: boolean, colorScheme: string) => {
  if (focused) {
    return colorScheme === "dark" ? "lightblue" : "blue";
  }
  return colorScheme === "dark" ? "white" : "black";
};
