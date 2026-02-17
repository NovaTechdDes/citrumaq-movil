import { Cliente } from '@/core/interface/Cliente';
import { useMutateClientes } from '@/hooks';
import { useLocalidades } from '@/hooks/localidades/useLocalidades';
import { useClienteStore } from '@/presentation/store/useClienteStore';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, Pressable, Text, TextInput, useColorScheme, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const initialState: Cliente = {
  domicilio: '',
  documento: '',
  denominacion: '',
  localidad: '',
  telefono: '',
  observacion_cliente: '',
};

const FormularioCliente = () => {
  const colorScheme = useColorScheme();
  const { closeModal, clienteSeleccionado } = useClienteStore();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: clienteSeleccionado ?? initialState,
  });
  const { agregarCliente, modificarCliente } = useMutateClientes();
  const { data: localidades } = useLocalidades();
  const { mutateAsync: agregar, isPending: isPendingAgregar } = agregarCliente;
  const { mutateAsync: modificar, isPending: isPendingModificar } = modificarCliente;

  const isPending = isPendingAgregar || isPendingModificar;

  const onSubmit = async (data: Cliente) => {
    try {
      if (clienteSeleccionado) {
        const { ok, message } = await modificar({ ...data, denominacion: data.denominacion.trim() });
        if (ok) {
          reset();
          closeModal();
        } else {
          Alert.alert('Error al Modificar', message);
        }
      } else {
        const { ok, message } = await agregar({ ...data, denominacion: data.denominacion.trim() });
        if (ok) {
          reset();
          closeModal();
        } else {
          Alert.alert('Error al Registrar', message);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const cerrarModal = () => {
    reset();
    closeModal();
  };

  useEffect(() => {
    if (clienteSeleccionado) {
      reset(clienteSeleccionado);
    } else {
      reset(initialState);
    }
  }, [clienteSeleccionado, reset]);

  return (
    <KeyboardAwareScrollView extraScrollHeight={20} enableOnAndroid={true} contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 px-6 pt-4 pb-20">
        <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-800">
          <View className="flex-row items-center mb-6">
            <View className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-full items-center justify-center mr-3">
              <Ionicons name={clienteSeleccionado ? 'person-add' : 'person'} size={20} color="#6366f1" />
            </View>
            <Text className="text-xl font-bold text-slate-900 dark:text-white">{clienteSeleccionado ? 'Actualizar Cliente' : 'Nuevo Cliente'}</Text>
          </View>

          <View className="gap-6">
            {/* Sección: Identidad */}
            <View>
              <Text className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 ml-1">Identificación Fiscal *</Text>
              <View className="gap-4">
                <Controller
                  name="denominacion"
                  control={control}
                  rules={{ required: 'La denominación es obligatoria' }}
                  render={({ field: { onChange, value } }) => (
                    <View>
                      <TextInput
                        className={`bg-slate-50 dark:bg-slate-800 h-14 px-5 rounded-2xl text-slate-900 dark:text-white font-medium border ${errors.denominacion ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:border-indigo-500 text-lg`}
                        value={value}
                        onChangeText={onChange}
                        placeholder="Nombre o Razón Social"
                        placeholderTextColor="#94a3b8"
                      />
                      {errors.denominacion && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.denominacion.message}</Text>}
                    </View>
                  )}
                />
                <Controller
                  name="documento"
                  control={control}
                  rules={{ required: 'El documento es obligatorio' }}
                  render={({ field: { onChange, value } }) => (
                    <View>
                      <TextInput
                        className={`bg-slate-50 dark:bg-slate-800 h-14 px-5 rounded-2xl text-slate-900 dark:text-white font-medium border ${errors.documento ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:border-indigo-500 text-lg`}
                        value={value}
                        onChangeText={onChange}
                        placeholder="CUIT / CUIL / DNI"
                        placeholderTextColor="#94a3b8"
                        keyboardType="numeric"
                      />
                      {errors.documento && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.documento.message}</Text>}
                    </View>
                  )}
                />
              </View>
            </View>

            {/* Sección: Ubicación y Contacto */}
            <View>
              <Text className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 ml-1">Ubicación y Contacto *</Text>
              <View className="gap-4">
                <Controller
                  name="localidad"
                  control={control}
                  rules={{ required: 'Seleccionar una localidad es obligatorio' }}
                  render={({ field: { onChange, value } }) => (
                    <View>
                      <View
                        className={`bg-slate-50 dark:bg-slate-800 rounded-2xl border ${errors.localidad ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} h-14 justify-center px-2 overflow-hidden`}
                      >
                        <Picker
                          selectedValue={value || ''}
                          dropdownIconColor="#94a3b8"
                          onValueChange={(itemValue) => onChange(itemValue)}
                          style={{ color: value ? (colorScheme === 'dark' ? '#fff' : '#1e293b') : '#94a3b8' }}
                        >
                          <Picker.Item label="Seleccionar Localidad" value="" />
                          {localidades?.map((loc) => (
                            <Picker.Item key={loc.id_loc} label={loc.nombre_loc} value={String(loc.id_loc)} />
                          ))}
                        </Picker>
                      </View>
                      {errors.localidad && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.localidad.message}</Text>}
                    </View>
                  )}
                />
                <Controller
                  name="domicilio"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      className="bg-slate-50 dark:bg-slate-800 h-14 px-5 rounded-2xl text-slate-900 dark:text-white font-medium border border-slate-200 dark:border-slate-700 focus:border-indigo-500 text-lg"
                      placeholder="Calle, Altura, Piso"
                      placeholderTextColor="#94a3b8"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                <Controller
                  name="telefono"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      className="bg-slate-50 dark:bg-slate-800 h-14 px-5 rounded-2xl text-slate-900 dark:text-white font-medium border border-slate-200 dark:border-slate-700 focus:border-indigo-500 text-lg"
                      placeholder="Teléfono / WhatsApp"
                      placeholderTextColor="#94a3b8"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="phone-pad"
                    />
                  )}
                />
              </View>
            </View>

            {/* Sección: Notas */}
            <View>
              <Text className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 ml-1">Información Adicional</Text>
              <Controller
                name="observacion_cliente"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-slate-900 dark:text-white font-medium border border-slate-200 dark:border-slate-700 focus:border-indigo-500 min-h-24"
                    placeholder="Detalles sobre entregas, facturación o contacto secundario..."
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
                  <Text className="text-white font-extrabold text-lg uppercase">{clienteSeleccionado ? 'Guardar Cambios' : 'Registrar Cliente'}</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default FormularioCliente;

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
