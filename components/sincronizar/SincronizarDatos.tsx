import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

const SincronizarDatos = () => {
    return (
        <View className='border border-gray-300 rounded-lg mx-5 p-2'>
            <View className='flex-row gap-5 items-center'>
                <Ionicons name='cloud-upload-outline' size={25} />
                <Text className='text-2xl font-bold'>
                    SincronizarDatos
                </Text>
            </View>


            <Pressable className='bg-black rounded-lg py-3 mt-5 flex-row items-center justify-center gap-5'>
                <Ionicons name='cloud-upload-outline' size={25} color='white' />
                <Text className='text-white text-xl  text-center'>Enviar Datos</Text>
            </Pressable>
            <Text className='mt-5 text-gray-900 text-xl'>Enviar clientes y maquinas al servidor</Text>
        </View >
    )
}

export default SincronizarDatos