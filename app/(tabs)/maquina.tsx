import FormularioMaquina from '@/components/maquinas/FormularioMaquina';
import MaquinaCard from '@/components/maquinas/MaquinaCard';
import { useMaquinas } from '@/hooks';
import { useMaquinaStore } from '@/presentation/store/useMaquinaStore';
import { Ionicons } from '@expo/vector-icons';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';


export default function Maquina() {

  const { data: maquinas, isLoading } = useMaquinas();

  const { modalAbierto, closeModal, openModal, setBuscador } = useMaquinaStore();

  const handleModal = () => {
    if (modalAbierto) {
      closeModal()
    } else {
      openModal()
    };
  };

  return (
    <View className='mx-2 mt-10'>
      <View className='flex-row justify-between items-center'>
        <Text className='text-2xl font-semibold'>Maquinas</Text>

        <Pressable onPress={handleModal} className='flex gap-2 flex-row bg-black rounded-lg px-2 py-1 items-center'>
          {!modalAbierto && <Ionicons name='add-outline' size={20} color='white' />}
          <Text className='text-white text-xl'>{modalAbierto ? 'Cerrar' : 'Agregar'}</Text>
        </Pressable>
      </View>

      {modalAbierto && <FormularioMaquina />}

      <View className='my-3'>
        <TextInput onChangeText={(e) => setBuscador(e.toUpperCase())} className='border border-gray-300 rounded-lg px-2 py-2 text-lg' placeholder='Buscar por maquina o cliente' />
      </View>

      <FlatList
        data={maquinas}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        renderItem={({ item }) => <MaquinaCard maquina={item} />}

      />
    </View>
  );
}
