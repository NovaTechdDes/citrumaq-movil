import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import "../global.css";

import { setupDatabase } from '@/database/migrations';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect } from 'react';

export const unstable_settings = {
  anchor: '(tabs)',
};

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    setupDatabase();
  }, [])

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={DefaultTheme}>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </SafeAreaView>
          <StatusBar style='inverted' />
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
