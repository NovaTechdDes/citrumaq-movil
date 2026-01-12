import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';

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
      Alert.alert('Codigo de Vendedor Guardado');
    } catch (error) {
      console.error('Error al guardar el vendedor:', error);
    }
    setLoading(false);
  };

  return (
    <View className="border my-2 border-gray-500 rounded-lg py-2 dark:bg-slate-700 px-5 mx-5">
      <Text className="text-2xl font-semibold dark:text-white">Vendedor</Text>

      <View>
        <Controller
          control={control}
          name="vendedor"
          render={({ field: { onChange, value, onBlur } }) => (
            <View className="flex-row items-center gap-2">
              <TextInput
                value={value?.toString()}
                onChangeText={(text) => onChange(text)}
                onBlur={onBlur}
                placeholder="Vendedor"
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
                className="border flex-1 rounded-lg px-2 border-gray-300 dark:text-white "
              />
              <Pressable onPress={handleSubmit(onSubmit)} disabled={loading} className="border border-gray-300 rounded-lg p-2 bg-blue-600">
                <Text className="text-white text-lg">{loading ? 'Guardando...' : 'Guardar'}</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Vendedor;
