import { Cliente } from '@/core/interface/Cliente';
import { Maquina } from '@/core/interface/Maquina';
import { useClientes, useMutateMaquinas } from '@/hooks';
import { useMaquinaStore } from '@/presentation/store/useMaquinaStore';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalListaClientes from './ModalListaClientes';

const initialState: Maquina = {
  anio: 0,
  descripcion: '',
  industria: '',
  marca: '',
  modelo: '',
  observacion_maquina: '',
  id_cliente: 0,
};

const FormularioMaquina = () => {
  const { data: clientes } = useClientes();

  const { closeModal, maquinaSeleccionada } = useMaquinaStore();
  const { reset, control, handleSubmit } = useForm({
    defaultValues: maquinaSeleccionada ?? initialState,
  });
  const { agregarMaquina, modificarMaquina } = useMutateMaquinas();
  const { mutateAsync: agregar, isPending: isPendingAgregar } = agregarMaquina;
  const { mutateAsync: modificar, isPending: isPendingModificar } = modificarMaquina;

  const [open, setOpen] = useState<boolean>(false);
  const [selectCliente, setSelectCliente] = useState<number>(0);

  const handleAddMaquina = async (data: Maquina) => {
    const ok = await agregar(data);
    if (ok) {
      closeModal();
      reset();
    }
  };
  const handleUpdateMaquina = async (data: Maquina) => {
    const ok = await modificar(data);
    if (ok) {
      reset();
      closeModal();
    }
  };

  const cerrarModal = () => {
    reset();
    closeModal();
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={15} enableOnAndroid={true}>
      <View className="border mx-5 border-gray-300 rounded-lg p-5 mt-5 mb-20 ">
        <Text className="font-semibold text-xl mb-2">{maquinaSeleccionada ? 'Modificar Maquina' : 'Nueva Maquina'}</Text>
        <View className="gap-5">
          <View>
            <Text className="font-semibold dark:text-white">Cliente *</Text>
            <Controller
              name="id_cliente"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Pressable className="border border-gray-500 rounded-lg p-2 flex-row justify-between items-center" onPress={() => setOpen(!open)}>
                  <Text className="text-lg dark:text-white">
                    {maquinaSeleccionada
                      ? devolverClienteLabel(clientes ?? [], maquinaSeleccionada.id_cliente!)
                      : selectCliente
                        ? devolverClienteLabel(clientes ?? [], selectCliente)
                        : 'Seleccione un cliente'}
                  </Text>
                  {!maquinaSeleccionada && (
                    <Text className="text-gray-500 dark:text-white">
                      <Ionicons name="chevron-down-outline" size={24} />
                    </Text>
                  )}
                  <ModalListaClientes onChange={onChange} clientes={clientes ?? []} setOpen={setOpen} setSelectCliente={setSelectCliente} open={open} />
                </Pressable>
              )}
            />
          </View>
          <View>
            <Text className="font-semibold dark:text-white">Descripcion *</Text>
            <Controller
              name="descripcion"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="border border-gray-500 rounded-lg text-xl pl-5 placeholder:text-gray-400 dark:text-white"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Descripcion de la maquina"
                />
              )}
            />
          </View>
          <View>
            <Text className="font-semibold dark:text-white">Marca</Text>
            <Controller
              name="marca"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput className="border border-gray-500 rounded-lg text-xl pl-5 placeholder:text-gray-400 dark:text-white" value={value} onChangeText={onChange} placeholder="Marca" />
              )}
            />
          </View>
          <View>
            <Text className="font-semibold dark:text-white">Modelo</Text>
            <Controller
              name="modelo"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput className="border border-gray-500 rounded-lg text-xl pl-5 placeholder:text-gray-400 dark:text-white" placeholder="Modelo" value={value} onChangeText={onChange} />
              )}
            />
          </View>
          <View>
            <Text className="font-semibold dark:text-white">Año</Text>
            <Controller
              name="anio"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="border border-gray-500 rounded-lg text-xl pl-5 placeholder:text-gray-400 dark:text-white"
                  placeholder="2025"
                  value={value ? String(value) : ''}
                  onChangeText={(text) => {
                    // Solo permitir números y prevenir valores que no sean dígitos
                    const numericValue = text.replace(/[^0-9]/g, '');
                    onChange(numericValue);
                  }}
                  keyboardType="numeric"
                />
              )}
            />
          </View>
          <View>
            <Text className="font-semibold dark:text-white">Industria</Text>
            <Controller
              name="industria"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput className="border border-gray-500 rounded-lg text-xl pl-5 placeholder:text-gray-400 dark:text-white" placeholder="Industria" value={value} onChangeText={onChange} />
              )}
            />
          </View>
          <View>
            <Text className="font-semibold dark:text-white">Observaciones</Text>
            <Controller
              name="observacion_maquina"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput className="border border-gray-500 rounded-lg text-xl pl-5 placeholder:text-gray-400 dark:text-white" placeholder="" value={value} onChangeText={onChange} />
              )}
            />
          </View>

          <View className="flex-row justify-center gap-5 w-full mb-5">
            {maquinaSeleccionada ? (
              <Pressable onPress={handleSubmit(handleUpdateMaquina)} disabled={isPendingModificar} className="border border-gray-300 px-5 bg-black py-2 rounded-lg dark:bg-blue-700">
                <Text className="text-xl font-semibold text-white">{isPendingModificar ? 'Modificando...' : 'Modificar Maquina'}</Text>
              </Pressable>
            ) : (
              <Pressable onPress={handleSubmit(handleAddMaquina)} disabled={isPendingAgregar} className="border border-gray-300 px-5 bg-black py-2 rounded-lg dark:bg-blue-500">
                <Text className="text-xl font-semibold text-white">{isPendingAgregar ? 'Agregando...' : 'Agregar Maquina'}</Text>
              </Pressable>
            )}
            <Pressable onPress={cerrarModal} className="border border-gray-300 px-5 py-2 rounded-lg">
              <Text className="text-xl font-semibold dark:text-white">Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default FormularioMaquina;

export const pickerStyles = {
  base: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#000',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  item: {
    color: '#000',
    backgroundColor: '#fff',
  },
  placeholder: {
    color: '#aaa',
  },
};

const devolverClienteLabel = (clientes: Cliente[], id: number) => {
  const cliente = clientes.find((cliente) => cliente.id === id);
  return cliente ? `${cliente.denominacion} - ${cliente.telefono} - ${cliente.nombre_loc}` : '';
};
