import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native';
//import { Snackbar } from "react-native-paper";
import { RootStackParamList } from '../../navegacion/AppNavigator';
import API_URL from "../../auxiliares/API_URL";
import EstilosVerificacion1Mail  from "./estilos/EstilosVerificacion1Mail";


const Verificacion1Mail = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Verificacion1Mail'>>();
  const [codigo, setCodigo] = useState('');  // Estado para almacenar el código ingresado
  const [email, setEmail] = useState(''); // Estado para almacenar el email
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [visible, setVisible] = useState(false);  // Estado para manejar la visibilidad del Snackbar
  const [message, setMessage] = useState("");  // Estado para almacenar el mensaje de error o éxito

  // Recupera el email desde los parámetros de la pantalla anterior
  useEffect(() => {
    if (route.params?.datosUsuario?.email) {
      setEmail(route.params.datosUsuario.email); // Asignar el email recibido
    } else {
      Alert.alert("Error", "No se recibió un correo electrónico válido.");
    }
  }, [route.params]);


  // Enviar el código cuando el correo se haya asignado
  useEffect(() => {
    if (email) {
      enviarCodigo();
    }
  }, [email]);


  const enviarCodigo = async () => {
    try {
      const response = await fetch(`${API_URL}/enviar-email/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });
  
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Éxito", "Código enviado al correo");
      } else {
        Alert.alert("Error", data.error || "No se pudo enviar el código");
      }
    } catch (error) {
      Alert.alert("Error", "Problema de conexión con el servidor");
    }
  };

  
  const validarCodigo = async () => {
    const codigoInt = parseInt(codigo, 10);
    if (isNaN(codigoInt)) {
      Alert.alert("Error", "Por favor ingresa un código válido.");
      setMessage("El código debe ser un número.");
      setVisible(true);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/validar-codigo/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo: codigoInt, email: email }), 
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Éxito", "Código válido");
        setMessage("El código es válido");
        console.log("Datos a enviar: ",route.params.datosUsuario);
        navigation.navigate('Verificacion2Registro', { datosUsuario: route.params.datosUsuario });
      } else {
        Alert.alert("Error", data.error || "El código no es válido");
        setMessage(data?.email || "El código no es válido.");
        setVisible(true);
      }
    } catch (error) {
      Alert.alert("Error", "Problema de conexión con el servidor");
      setMessage("Error de conexión. Inténtalo de nuevo.");
      setVisible(true);
    }
  };

  return (
    <SafeAreaView style={EstilosVerificacion1Mail.areaSegura}>
      <View style={EstilosVerificacion1Mail.contenedor}>
        <Text style={EstilosVerificacion1Mail.titulo}>Verificación</Text>
        <Text style={EstilosVerificacion1Mail.subtitulo}>PASO 1</Text>
        <Text style={EstilosVerificacion1Mail.instruccion}>Ingrese el código numérico que se ha enviado a su correo electrónico:</Text>

        {/* Campo de entrada de código */}
        <TextInput
          placeholder="Código"
          style={EstilosVerificacion1Mail.entrada}
          value={codigo}
          onChangeText={setCodigo}
          keyboardType="number-pad"
        />

        {/* Botón para validar el código */}
        <TouchableOpacity
          style={EstilosVerificacion1Mail.botonSiguiente}
          onPress={validarCodigo}
        >
          <Text style={EstilosVerificacion1Mail.textoBoton}>Siguiente</Text>
          <Ionicons name="arrow-forward" size={20} color="#197278" />
        </TouchableOpacity>
      </View>


      {/* Snackbar para mostrar mensajes 
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={4000} // 4 segundos
        style={{ marginLeft: -30, alignSelf: "center", width: "90%" }}
      >
        {message}
      </Snackbar>
*/}
    </SafeAreaView>
  );
};

export default Verificacion1Mail;
