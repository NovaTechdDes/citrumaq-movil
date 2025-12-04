import { Cliente } from "@/core/interface/Cliente";
import { useMutateClientes } from "@/hooks";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { useClienteStore } from "@/presentation/store/useClienteStore";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const initialState: Cliente = {
  domicilio: "",
  documento: "",
  denominacion: "",
  telefono: "",
  observacion_cliente: "",
};

const FormularioCliente = () => {
  const { closeModal, clienteSeleccionado } = useClienteStore();
  const colorScheme = useColorScheme();

  const { reset, control, handleSubmit } = useForm({
    defaultValues: clienteSeleccionado ?? initialState,
  });
  const { agregarCliente, modificarCliente } = useMutateClientes();
  const { mutateAsync: agregar, isPending } = agregarCliente;
  const { mutateAsync: modificar, isPending: isPendingModificar } =
    modificarCliente;

  const handleAddCliente = async (data: Cliente) => {
    const ok = await agregar(data);
    if (ok) {
      reset();
      closeModal();
    }
  };

  const handleUpdateCliente = async (data: Cliente) => {
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
    <KeyboardAwareScrollView extraScrollHeight={2} enableOnAndroid={true}>
      <View className="border mx-5 border-gray-300 rounded-lg p-5 mt-5 ">
        <Text className="font-semibold text-xl mb-2">
          {clienteSeleccionado ? "Modifica Cliente" : "Nuevo Cliente"}
        </Text>
        <View className="gap-5">
          <View>
            <Text
              className={`font-semibold mb-2 text-xl ${colorScheme === "dark" ? "text-white" : "text-black"}`}
            >
              Nombre *
            </Text>
            <Controller
              name="denominacion"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`border border-gray-500 rounded-lg text-xl pl-5 placeholder:text-gray-400 ${colorScheme === "dark" ? "text-white" : "text-black"}`}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Nombre del cliente"
                />
              )}
            />
          </View>
          <View>
            <Text
              className={`font-semibold mb-2 text-xl ${colorScheme === "dark" ? "text-white" : "text-black"}`}
            >
              Documento
            </Text>
            <Controller
              name="documento"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`border border-gray-500 rounded-lg text-xl pl-5 placeholder:text-gray-400 ${colorScheme === "dark" ? "text-white" : "text-black"}`}
                  value={value}
                  onChangeText={onChange}
                  placeholder="00000000"
                />
              )}
            />
          </View>
          <View>
            <Text
              className={`font-semibold mb-2 text-xl ${colorScheme === "dark" ? "text-white" : "text-black"}`}
            >
              Domicilio
            </Text>
            <Controller
              name="domicilio"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`border border-gray-500 rounded-lg text-xl pl-5 placeholder:text-gray-400 ${colorScheme === "dark" ? "text-white" : "text-black"}`}
                  placeholder="Av Siempre Viva 123"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          <View>
            <Text
              className={`font-semibold mb-2 text-xl ${colorScheme === "dark" ? "text-white" : "text-black"}`}
            >
              Telefono
            </Text>
            <Controller
              name="telefono"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`border border-gray-500 rounded-lg text-xl pl-5 placeholder:text-gray-400 ${colorScheme === "dark" ? "text-white" : "text-black"}`}
                  placeholder="+3456445089"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          <View>
            <Text></Text>
            <TextInput />
          </View>

          <View className="flex-row justify-center gap-5 w-full">
            {clienteSeleccionado ? (
              <Pressable
                onPress={handleSubmit(handleUpdateCliente)}
                disabled={isPendingModificar}
                className="border border-gray-300 px-5 bg-black py-2 rounded-lg"
              >
                <Text className="text-xl font-semibold text-white">
                  {isPendingModificar ? "Modificando..." : "Modificar Cliente"}
                </Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={handleSubmit(handleAddCliente)}
                disabled={isPending}
                className="border border-gray-300 px-5 bg-black py-2 rounded-lg dark:bg-blue-500  dark:border-blue-500"
              >
                <Text className="text-xl font-semibold text-white dark:text-black">
                  {isPending ? "Agregando..." : "Agregar Cliente"}
                </Text>
              </Pressable>
            )}
            <Pressable
              onPress={cerrarModal}
              className="border border-gray-300 px-5 py-2 rounded-lg dark:border-gray-500"
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

export default FormularioCliente;
