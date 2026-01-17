import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import '../global.css';

import { getDb } from '@/database/db';
import { setupDatabase } from '@/database/migrations';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect } from 'react';
import { AppState } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    setupDatabase();
  }, []);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        getDb();
      }
    });

    return () => sub.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={DefaultTheme}>
          <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'right', 'left']}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar animated translucent={false} style={colorScheme === 'dark' ? 'light' : 'dark'} backgroundColor={colorScheme === 'dark' ? 'white' : 'black'} />
          </SafeAreaView>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
