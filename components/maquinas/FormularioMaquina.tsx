import { Cliente } from '@/core/interface/Cliente';
import { Maquina } from '@/core/interface/Maquina';
import { useClientes, useMutateMaquinas } from '@/hooks';
import { useMaquinaStore } from '@/presentation/store/useMaquinaStore';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
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

  const isPending = isPendingAgregar || isPendingModificar;
  const [open, setOpen] = useState<boolean>(false);
  const [selectCliente, setSelectCliente] = useState<number>(0);

  const onSubmit = async (data: Maquina) => {
    try {
      if (maquinaSeleccionada) {
        const { ok } = await modificar(data);
        if (ok) {
          reset();
          closeModal();
        }
      } else {
        const { ok } = await agregar(data);
        if (ok) {
          reset();
          closeModal();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cerrarModal = () => {
    reset();
    closeModal();
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={15} enableOnAndroid={true} contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 px-6 pt-4 pb-20">
        <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-800">
          <View className="flex-row items-center mb-6">
            <View className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-full items-center justify-center mr-3">
              <Ionicons name={maquinaSeleccionada ? 'construct' : 'add'} size={20} color="#6366f1" />
            </View>
            <Text className="text-xl font-bold text-slate-900 dark:text-white">{maquinaSeleccionada ? 'Editar Especificaciones' : 'Nuevo Equipo'}</Text>
          </View>

          <View className="gap-6">
            {/* Sección: Cliente */}
            <View>
              <Text className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 ml-1">Cliente Propietario *</Text>
              <Controller
                name="id_cliente"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange } }) => (
                  <Pressable
                    className="bg-slate-50 dark:bg-slate-800 h-14 px-5 rounded-2xl flex-row justify-between items-center border border-slate-200 dark:border-slate-700 active:border-indigo-500"
                    onPress={() => setOpen(!open)}
                  >
                    <Text className="text-slate-900 dark:text-white font-medium text-base overflow-hidden" numberOfLines={1}>
                      {maquinaSeleccionada
                        ? devolverClienteLabel(clientes ?? [], maquinaSeleccionada.id_cliente!)
                        : selectCliente
                          ? devolverClienteLabel(clientes ?? [], selectCliente)
                          : 'Vincular a un cliente...'}
                    </Text>
                    {!maquinaSeleccionada && <Ionicons name="chevron-down" size={20} color="#94a3b8" />}
                    <ModalListaClientes onChange={onChange} clientes={clientes ?? []} setOpen={setOpen} setSelectCliente={setSelectCliente} open={open} />
                  </Pressable>
                )}
              />
            </View>

            {/* Sección: Información Básica */}
            <View>
              <Text className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 ml-1">Identificación del Equipo *</Text>
              <Controller
                name="descripcion"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="bg-slate-50 dark:bg-slate-800 h-14 px-5 rounded-2xl text-slate-900 dark:text-white font-medium border border-slate-200 dark:border-slate-700 focus:border-indigo-500 text-lg"
                    value={value}
                    onChangeText={onChange}
                    placeholder="Ej. Cortadora Plasma Industrial X2"
                    placeholderTextColor="#94a3b8"
                  />
                )}
              />
            </View>

            {/* Sección: Especificaciones Técnicas (Grid-ish) */}
            <View className="flex-row gap-4">
              <View className="flex-1">
                <Text className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1 ml-1 uppercase tracking-wider">Marca</Text>
                <Controller
                  name="marca"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      className="bg-slate-50 dark:bg-slate-800 h-12 px-4 rounded-xl text-slate-900 dark:text-white font-semibold border border-slate-200 dark:border-slate-700 focus:border-indigo-500"
                      value={value}
                      onChangeText={onChange}
                      placeholder="Marca"
                      placeholderTextColor="#94a3b8"
                    />
                  )}
                />
              </View>
              <View className="flex-1">
                <Text className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1 ml-1 uppercase tracking-wider">Modelo</Text>
                <Controller
                  name="modelo"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      className="bg-slate-50 dark:bg-slate-800 h-12 px-4 rounded-xl text-slate-900 dark:text-white font-semibold border border-slate-200 dark:border-slate-700 focus:border-indigo-500"
                      placeholder="Modelo"
                      value={value}
                      onChangeText={onChange}
                      placeholderTextColor="#94a3b8"
                    />
                  )}
                />
              </View>
            </View>

            <View className="flex-row gap-4">
              <View className="flex-1">
                <Text className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1 ml-1 uppercase tracking-wider">Año de Fab.</Text>
                <Controller
                  name="anio"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      className="bg-slate-50 dark:bg-slate-800 h-12 px-4 rounded-xl text-slate-900 dark:text-white font-semibold border border-slate-200 dark:border-slate-700 focus:border-indigo-500"
                      placeholder="2024"
                      placeholderTextColor="#94a3b8"
                      value={value ? String(value) : ''}
                      onChangeText={(text) => {
                        const numericValue = text.replace(/[^0-9]/g, '');
                        onChange(numericValue === '' ? 0 : Number(numericValue));
                      }}
                      keyboardType="numeric"
                    />
                  )}
                />
              </View>
              <View className="flex-1">
                <Text className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1 ml-1 uppercase tracking-wider">Industria</Text>
                <Controller
                  name="industria"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      className="bg-slate-50 dark:bg-slate-800 h-12 px-4 rounded-xl text-slate-900 dark:text-white font-semibold border border-slate-200 dark:border-slate-700 focus:border-indigo-500"
                      placeholder="Ej. Textil"
                      value={value}
                      onChangeText={onChange}
                      placeholderTextColor="#94a3b8"
                    />
                  )}
                />
              </View>
            </View>

            {/* Sección: Observaciones */}
            <View>
              <Text className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 ml-1">Observaciones Técnicas</Text>
              <Controller
                name="observacion_maquina"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-slate-900 dark:text-white font-medium border border-slate-200 dark:border-slate-700 focus:border-indigo-500 min-h-24"
                    placeholder="Detalles adicionales sobre el estado o configuración..."
                    placeholderTextColor="#94a3b8"
                    value={value}
                    onChangeText={onChange}
                    multiline
                    textAlignVertical="top"
                  />
                )}
              />
            </View>

            {/* Botones de Acción */}
            <View className="flex-row gap-3 mt-4">
              <Pressable className="flex-1 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl items-center justify-center active:bg-slate-200 dark:active:bg-slate-700" onPress={cerrarModal}>
                <Text className="text-slate-700 dark:text-slate-300 font-bold text-lg">Cancelar</Text>
              </Pressable>

              <Pressable
                onPress={handleSubmit(onSubmit)}
                disabled={isPending}
                className={`flex-[2] h-14 rounded-2xl items-center justify-center shadow-lg ${isPending ? 'bg-slate-200 dark:bg-slate-700' : 'bg-indigo-600 active:bg-indigo-700 shadow-indigo-200 dark:shadow-none'}`}
              >
                {isPending ? (
                  <ActivityIndicator color="#ffffff" size="small" />
                ) : (
                  <Text className="text-white font-extrabold text-lg">{maquinaSeleccionada ? 'ACTUALIZAR MAQUINA' : 'REGISTRAR EQUIPO'}</Text>
                )}
              </Pressable>
            </View>
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
  return cliente ? `${cliente.denominacion} - ${cliente.nombre_loc}` : '';
};
