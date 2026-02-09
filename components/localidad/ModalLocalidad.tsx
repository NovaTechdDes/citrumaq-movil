import { useMutateLocalidades } from '@/hooks';
import { useLocalidadStore } from '@/presentation/store/useLocalidadStore';
import { Ionicons } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, Pressable, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ModalLocalidad = () => {
  const { closeModal, localidadSeleccinado } = useLocalidadStore();
  const { control, reset, handleSubmit } = useForm({
    defaultValues: localidadSeleccinado || { nombre_loc: '' },
  });
  const { agregarLocalidad, modificarLocalidad } = useMutateLocalidades();

  const { mutateAsync: agregar, isPending: isPendingAgregar } = agregarLocalidad;
  const { mutateAsync: modificar, isPending: isPendingModificar } = modificarLocalidad;

  const isPending = isPendingAgregar || isPendingModificar;

  const onCancel = () => {
    reset();
    closeModal();
  };

  const onSubmit = async (data: any) => {
    try {
      if (localidadSeleccinado) {
        const ok = await modificar(data);
        if (ok) {
          reset();
          closeModal();
        }
      } else {
        const { ok, message } = await agregar(data);
        if (!ok) {
          Alert.alert('Error de registro', message);
          return;
        }
        reset();
        closeModal();
      }
    } catch {
      Alert.alert('Error de sistema', 'Ocurrió un error inesperado al procesar la localidad.');
    }
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={15} enableOnAndroid={true} contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 px-6 pt-6 pb-20">
        <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-800">
          <View className="flex-row items-center mb-6">
            <View className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-full items-center justify-center mr-3">
              <Ionicons name={localidadSeleccinado ? 'pencil' : 'add'} size={20} color="#3b82f6" />
            </View>
            <Text className="text-xl font-bold text-slate-900 dark:text-white">{localidadSeleccinado ? 'Editar Localidad' : 'Nueva Localidad'}</Text>
          </View>

          <View className="mb-8">
            <Text className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 ml-1">Nombre de la Ubicación</Text>
            <Controller
              name="nombre_loc"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <View className="relative">
                  <TextInput
                    placeholder="Ej. Planta Central Sur"
                    placeholderTextColor="#94a3b8"
                    className="bg-slate-50 dark:bg-slate-800 h-14 px-5 rounded-2xl text-slate-900 dark:text-white font-medium border border-slate-200 dark:border-slate-700 focus:border-blue-500 text-lg"
                    value={value}
                    onChangeText={onChange}
                    autoFocus={!localidadSeleccinado}
                  />
                </View>
              )}
            />
            <Text className="mt-2 text-slate-400 dark:text-slate-500 text-xs italic ml-1">* El nombre debe ser descriptivo para facilitar la asignación.</Text>
          </View>

          <View className="flex-row gap-3">
            <Pressable className="flex-1 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl items-center justify-center active:bg-slate-200 dark:active:bg-slate-700" onPress={onCancel}>
              <Text className="text-slate-700 dark:text-slate-300 font-bold">Cancelar</Text>
            </Pressable>

            <Pressable
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
              className={`flex-[2] h-12 rounded-xl items-center justify-center ${isPending ? 'bg-slate-200 dark:bg-slate-700' : 'bg-blue-600 active:bg-blue-700'}`}
            >
              {isPending ? <ActivityIndicator color="#ffffff" size="small" /> : <Text className="text-white font-bold text-base">{localidadSeleccinado ? 'Actualizar' : 'Registrar'}</Text>}
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ModalLocalidad;
