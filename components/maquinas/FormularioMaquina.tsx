import { Maquina } from "@/core/interface/Maquina";
import { useClientes, useMutateMaquinas } from "@/hooks";
import { useMaquinaStore } from "@/presentation/store/useMaquinaStore";
import { Picker } from "@react-native-picker/picker";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const initialState: Maquina = {
  anio: 0,
  descripcion: "",
  industria: "",
  marca: "",
  modelo: "",
  observacion_maquina: "",
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
  const { mutateAsync: modificar, isPending: isPendingModificar } =
    modificarMaquina;

  const handleAddMaquina = async (data: Maquina) => {
    const ok = await agregar(data);
    if (ok) {
      reset();
      closeModal();
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
        <Text className="font-semibold text-xl mb-2">
          {maquinaSeleccionada ? "Modificar Maquina" : "Nueva Maquina"}
        </Text>
        <View className="gap-5">
          <View>
            <Text className="font-semibold">Cliente *</Text>
            <Controller
              name="id_cliente"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Picker
                  style={pickerStyles.base}
                  selectedValue={value || ""}
                  dropdownIconColor="#333"
                  onValueChange={onChange}
                >
                  <Picker.Item label="Seleccionar Cliente" value="" />
                  {clientes?.map((cliente) => (
                    <Picker.Item
                      color={pickerStyles.item.color}
                      value={cliente.id}
                      label={`${cliente.denominacion} - ${cliente.telefono}`}
                    />
                  ))}
                </Picker>
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
                <TextInput
                  className="border border-gray-500 rounded-lg text-xl pl-5 placeholder:text-gray-400 dark:text-white"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Marca"
                />
              )}
            />
          </View>
          <View>
            <Text className="font-semibold dark:text-white">Modelo</Text>
            <Controller
              name="modelo"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="border border-gray-500 rounded-lg text-xl pl-5 placeholder:text-gray-400 dark:text-white"
                  placeholder="Modelo"
                  value={value}
                  onChangeText={onChange}
                />
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
                  value={value ? String(value) : ""}
                  onChangeText={(text) => {
                    // Solo permitir números y prevenir valores que no sean dígitos
                    const numericValue = text.replace(/[^0-9]/g, "");
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
                <TextInput
                  className="border border-gray-500 rounded-lg text-xl pl-5 placeholder:text-gray-400 dark:text-white"
                  placeholder="Industria"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          <View>
            <Text className="font-semibold dark:text-white">Observaciones</Text>
            <Controller
              name="observacion_maquina"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="border border-gray-500 rounded-lg text-xl pl-5 placeholder:text-gray-400 dark:text-white"
                  placeholder=""
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>

          <View className="flex-row justify-center gap-5 w-full mb-5">
            {maquinaSeleccionada ? (
              <Pressable
                onPress={handleSubmit(handleUpdateMaquina)}
                disabled={isPendingModificar}
                className="border border-gray-300 px-5 bg-black py-2 rounded-lg dark:bg-blue-700"
              >
                <Text className="text-xl font-semibold text-white">
                  {isPendingModificar ? "Modificando..." : "Modificar Maquina"}
                </Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={handleSubmit(handleAddMaquina)}
                disabled={isPendingAgregar}
                className="border border-gray-300 px-5 bg-black py-2 rounded-lg dark:bg-blue-500"
              >
                <Text className="text-xl font-semibold text-white">
                  {isPendingAgregar ? "Agregando..." : "Agregar Maquina"}
                </Text>
              </Pressable>
            )}
            <Pressable
              onPress={cerrarModal}
              className="border border-gray-300 px-5 py-2 rounded-lg"
            >
              <Text className="text-xl font-semibold dark:text-white">
                Cancelar
              </Text>
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
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "#000",
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  item: {
    color: "#white",
    backgroundColor: "#fff",
  },
  placeholder: {
    color: "#aaa",
  },
};
