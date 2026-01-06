import { useMutateLocalidades } from '@/hooks';
import { useLocalidadStore } from '@/presentation/store/useLocalidadStore';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ModalLocalidad = () => {
  const { closeModal, localidadSeleccinado } = useLocalidadStore();
  const { control, reset, handleSubmit } = useForm({
    defaultValues: localidadSeleccinado || {},
  });
  const { agregarLocalidad, modificarLocalidad } = useMutateLocalidades();

  const { mutateAsync: agregar, isPending } = agregarLocalidad;
  const { mutateAsync: modificar, isPending: isPendingModificar } = modificarLocalidad;

  const onCancel = () => {
    reset();
    closeModal();
  };

  const onSubmit = async (data: any) => {
    if (localidadSeleccinado) {
      const ok = await modificar(data);
      if (ok) {
        reset();
        closeModal();
      }
    } else {
      const { ok, message } = await agregar(data);

      if (!ok) {
        Alert.alert('Error: ', message);
        return;
      }

      if (ok) {
        reset();
        closeModal();
      }
    }
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={15} enableOnAndroid={true}>
      <View className="border mx-5 border-gray-300 rounded-lg p-5 mt-5 mb-20">
        <View className="gap-5">
          <View className="gap-5">
            <Text className="font-semibold text-black dark:text-white">Nombre Localidad</Text>
            <Controller
              name="nombre_loc"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Nombre Localidad"
                  className={`border border-gray-500 rounded-lg text-xl pl-5  light:text-black dark:text-white placeholder:text-gray-400`}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          <View className="flex-row justify-between mt-5">
            <Pressable className="bg-red-500 p-2 rounded-lg" onPress={onCancel}>
              <Text className="text-black dark:text-white">Cancelar</Text>
            </Pressable>
            {!localidadSeleccinado ? (
              <Pressable onPress={handleSubmit(onSubmit)} disabled={isPending} className="bg-blue-500 p-2 rounded-lg">
                <Text className="text-black dark:text-white">{isPending ? 'Guardando...' : 'Guardar'}</Text>
              </Pressable>
            ) : (
              <Pressable onPress={handleSubmit(onSubmit)} disabled={isPendingModificar} className="bg-blue-500 p-2 rounded-lg">
                <Text className="text-black dark:text-white">{isPendingModificar ? 'Modificando...' : 'Modificar'}</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ModalLocalidad;
