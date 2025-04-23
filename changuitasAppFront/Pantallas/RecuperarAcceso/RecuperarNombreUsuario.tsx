import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Snackbar } from "react-native-paper";
import { RootStackParamList } from '../../navegacion/AppNavigator';
import API_URL from "../../auxiliares/API_URL";
import EstilosRecuperarNombreUsuario from "./estilos/EstilosRecuperarNombreUsuario";

const RecuperarNombreUsuario = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");  // Estado para el email
  const [visible, setVisible] = useState(false);  // Estado para manejar la visibilidad del Snackbar
  const [message, setMessage] = useState("");  // Estado para almacenar el mensaje de error o éxito

  // Función para enviar la solicitud al backend
  const enviarSolicitud = async () => {
    if (!email.trim()) {
      setMessage("Por favor, ingresa un correo electrónico válido.");
      setVisible(true);
      return;
    }

   
    // Mostrar mensaje de envío antes de la petición
    setMessage(`Enviando correo al Email: ${email}...`);
    setVisible(true);

    try {
      const response = await fetch(`${API_URL}/obtener-username/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Revisa tu correo electrónico.");
        setVisible(true);
        setTimeout(() => {
          navigation.goBack(); 
        }, 4000);
      } else {
        setMessage(data?.email || "Hubo un error al procesar la solicitud.");
        setVisible(true);
      }
    } catch (error) {
      setMessage("Error de conexión. Inténtalo de nuevo.");
      setVisible(true);
    }
  };

  return (
    <SafeAreaView style={EstilosRecuperarNombreUsuario.areaSegura}>
      <View style={EstilosRecuperarNombreUsuario.contenedor}>
        {/* Título de la pantalla */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", top: 30, left: 20,marginTop:45 }}>
                <Ionicons name="arrow-back" size={24} color="#197278" />
                </TouchableOpacity>
        <Text style={EstilosRecuperarNombreUsuario.titulo}>Recuperar usuario</Text>

        {/* Paso de verificación */}
        <Text style={EstilosRecuperarNombreUsuario.instruccion}>
          Para recuperar tu nombre de usuario, escribe tu correo electrónico para recibir tu nombre de usuario.
        </Text>

        {/* Campo de entrada */}
        <TextInput
          placeholder="Correo electrónico"
          style={EstilosRecuperarNombreUsuario.entrada}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        {/* Snackbar para mostrar mensajes */}
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={4000} // 4 segundos
          style={{
            marginLeft: -30, 
            alignSelf: "center", 
            width: "90%", 
          }}
        >
          {message}
</Snackbar>

        {/* Botón de enviar */}
        <TouchableOpacity 
          style={EstilosRecuperarNombreUsuario.botonSiguiente} 
          onPress={enviarSolicitud}
        >
          <Text style={EstilosRecuperarNombreUsuario.textoBoton}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RecuperarNombreUsuario;
