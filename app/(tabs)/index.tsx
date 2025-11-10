import ClienteCard from '@/components/clientes/ClienteCard';
import FormularioCliente from '@/components/clientes/FormularioCliente';
import { useClientes } from '@/hooks';
import { useClienteStore } from '@/presentation/store/useClienteStore';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const { data: clientes, isLoading } = useClientes();
  const { openModal, closeModal, modalAbierto, setBuscador } = useClienteStore();

  const handleModal = () => {
    if (modalAbierto) {
      closeModal();
    } else {
      openModal();
    }
  };

  return (
    <View className='mx-2 mt-10'>
      <View className='flex-row justify-between items-center'>
        <Text className='text-2xl font-semibold'>Mis Clientes</Text>

        <Pressable onPress={handleModal} className='flex gap-2 flex-row bg-black rounded-lg px-2 py-1 items-center'>
          {!modalAbierto && <Ionicons name='add-outline' size={20} color='white' />}
          <Text className='text-white  text-xl'>{modalAbierto ? 'Cerrar' : 'Agregar'}</Text>
        </Pressable>
      </View>

      {modalAbierto && <FormularioCliente />}

      <View className='mt-2 border rounded-lg border-slate-500'>
        <TextInput className='placeholder:text-gray-400' placeholder='Buscar el cliente por nombre, telefono' onChangeText={(e) => setBuscador(e.toUpperCase())} />
      </View>

      <ScrollView className='gap-5 mt-5' showsVerticalScrollIndicator={false} contentContainerClassName='pb-32'>
        {
          clientes?.map(cliente => (
            <ClienteCard key={cliente.id?.toString()} cliente={cliente} />
          ))
        }
      </ScrollView>

    </View>
  );
};
