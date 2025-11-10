import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

interface URL {
    url: string
};

const initialState: URL = {
    url: ''
};

const STORAGE_KEY = '@server_url';

const Servidor = () => {
    const { control, handleSubmit, setValue } = useForm<URL>({
        defaultValues: initialState
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const saved = await AsyncStorage.getItem(STORAGE_KEY);
                if (saved) setValue('url', saved);
            } catch (error) {
                console.warn("Error al leer URL guardada", error);
            }
        })()
    }, [setValue]);

    const onSubmit = async (data: URL) => {
        setLoading(true);
        try {
            await AsyncStorage.setItem(STORAGE_KEY, data.url);
            Alert.alert('Guardado', 'La url fue guardada correctamente')
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "No se pudo guardar la URL.");
        } finally {
            setLoading(false)
        }

    };

    return (
        <KeyboardAvoidingView behavior={Platform.select({ ios: "padding", android: undefined })} className='m-5 border border-gray-300 rounded-lg p-5' >
            <Text className='text-2xl font-bold gap-5'>
                <Ionicons name='cog-outline' size={20} />
                <Text>Configurar Sevidor</Text>
            </Text>

            <Controller control={control} name='url' render={({ field: { onChange, onBlur, value } }) => (
                <View className='mt-5'>
                    <Text className='text-xl font-bold mb-2'>URL del Servidor</Text>
                    <TextInput
                        onChangeText={onChange}
                        placeholder='http://localhost:3000'
                        onBlur={onBlur}
                        keyboardType='url'
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={value}
                        className='border rounded-lg px-2 border-gray-300'
                    />
                </View>
            )} />

            <Pressable disabled={loading} onPress={handleSubmit(onSubmit)} className='bg-black rounded-lg mt-5 py-2'>
                <Text className='text-white text-center text-xl'>{loading ? 'Guardando...' : 'Guardar Configuracion'}</Text>
            </Pressable>
        </KeyboardAvoidingView >
    )
}

export default Servidor