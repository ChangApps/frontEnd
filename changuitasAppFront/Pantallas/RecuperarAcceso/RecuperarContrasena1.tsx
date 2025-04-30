import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Snackbar } from "react-native-paper";
import { RootStackParamList } from '../../navegacion/AppNavigator';
import API_URL from "../../auxiliares/API_URL";
import EstilosRecuperarContrasena1 from "../RecuperarAcceso/estilos/EstilosRecuperarContrasena1";

const RecuperarContrasena1 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");  
  const [visible, setVisible] = useState(false);  
  const [message, setMessage] = useState("");  
  const [loading, setLoading] = useState(false);

  const enviarCodigo = async () => {
    if (!email) {
      setMessage("Por favor, ingresa un correo electrónico.");
      setVisible(true);
      return;
    }

    if (!email.includes("@")) {
      setMessage("El correo electrónico no es válido.");
      setVisible(true);
      return;
    }

    setLoading(true);
    setMessage(`Enviando código a ${email}...`);
    setVisible(true);

    try {
      const response = await fetch(`${API_URL}/verificar-email/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Código enviado al correo");
        navigation.navigate("RecuperarContrasena2", { email: email });
      } else {
        setMessage(data.error || "No se pudo enviar el código");
        setVisible(true);
      }
    } catch (error) {
      setMessage("Error de conexión. Inténtalo de nuevo.");
      setVisible(true);
    } finally {
      setLoading(false);
      setVisible(true);
    }
  };

  return (
    <SafeAreaView style={EstilosRecuperarContrasena1.areaSegura}>
      <View style={EstilosRecuperarContrasena1.contenedor}>
        {/* Contenedor del título y la flecha */}
        <View style={EstilosRecuperarContrasena1.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={EstilosRecuperarContrasena1.botonAtras}>
            <Ionicons name="arrow-back" size={24} color="#197278" />
          </TouchableOpacity>
          <Text style={EstilosRecuperarContrasena1.titulo}>Recuperar contraseña</Text>
        </View>

        <Text style={EstilosRecuperarContrasena1.instruccion}>
          Para recuperar tu contraseña, escribe tu correo electrónico para recibir el código de recuperación.
        </Text>

        <TextInput
          placeholder="Correo electrónico"
          style={EstilosRecuperarContrasena1.entrada}
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />

        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={4000}
          style={{
            marginLeft: -30, 
            alignSelf: "center", 
            width: "90%", 
          }}
        >
          {message}
        </Snackbar>
    
        <TouchableOpacity 
          style={EstilosRecuperarContrasena1.botonSiguiente} 
          onPress={enviarCodigo} 
          disabled={loading}  
        >
          <Text style={EstilosRecuperarContrasena1.textoBoton}>{loading ? "Enviando..." : "Enviar"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RecuperarContrasena1;