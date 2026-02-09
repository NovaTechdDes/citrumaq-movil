import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, Pressable, Text, TextInput, View } from 'react-native';

interface CodigoVendedor {
  vendedor: number;
}

const STORAGE_KEY = 'vendedor';

const Vendedor = () => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, setValue } = useForm<CodigoVendedor>({
    defaultValues: {
      vendedor: 0,
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setValue('vendedor', parseInt(saved));
      } catch (error) {
        console.warn('Error al leer el Vendedor Guardado', error);
      }
    })();
  }, [setValue]);

  const onSubmit = async (data: CodigoVendedor) => {
    try {
      setLoading(true);
      await AsyncStorage.setItem(STORAGE_KEY, data.vendedor.toString());
      Alert.alert('Éxito', 'Identificación de terminal guardada correctamente');
    } catch (error) {
      console.error('Error al guardar el vendedor:', error);
      Alert.alert('Error', 'No se pudo guardar la identificación');
    }
    setLoading(false);
  };

  return (
    <View className="mx-6 my-3 p-5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
      <View className="flex-row items-center mb-4">
        <View className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-full items-center justify-center mr-3">
          <Ionicons name="person-outline" size={20} color="#3b82f6" />
        </View>
        <Text className="text-xl font-bold text-slate-900 dark:text-white">ID de Terminal</Text>
      </View>

      <Controller
        control={control}
        name="vendedor"
        render={({ field: { onChange, value, onBlur } }) => (
          <View className="flex-row items-center">
            <View className="flex-1 mr-2">
              <TextInput
                value={(value || 0) > 0 ? value!.toString() : ''}
                onChangeText={(text) => onChange(text)}
                onBlur={onBlur}
                placeholder="000"
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#94a3b8"
                className="bg-slate-50 dark:bg-slate-800 h-12 px-4 rounded-xl text-slate-900 dark:text-white font-medium border border-slate-200 dark:border-slate-700 focus:border-blue-500"
              />
            </View>
            <Pressable
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              className={`h-12 px-6 rounded-xl items-center justify-center ${loading ? 'bg-slate-200 dark:bg-slate-700' : 'bg-blue-600 active:bg-blue-700'}`}
            >
              {loading ? <ActivityIndicator color="#ffffff" size="small" /> : <Text className="text-white font-bold text-base">Guardar</Text>}
            </Pressable>
          </View>
        )}
      />
      <Text className="mt-3 text-slate-400 dark:text-slate-500 text-xs italic">* Este código identifica tus operaciones en el servidor central.</Text>
    </View>
  );
};

export default Vendedor;
