import { Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import API_URL from "../../utils/API_URL";
import EstilosRecuperarNombreUsuario from "./estilos/EstilosRecuperarNombreUsuario";
import { NavBarSuperior } from "../../componentes/NavBarSuperior";
import { useWindowDimensions } from 'react-native';
import { Button } from "../../componentes/Buttons";
import Colors from "../../assets/Colors";
import Input from "../../componentes/inputs/Input";
import { LinearGradient } from "expo-linear-gradient";
import CustomSnackbar from '../../componentes/CustomSnackbar';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  const { width } = useWindowDimensions();

  return (
    <SafeAreaView edges={['top']} style={EstilosRecuperarNombreUsuario.safeContainer}>
      <LinearGradient colors={[Colors.degradeTop, Colors.degradeBottom]} style={EstilosRecuperarNombreUsuario.degradado}>
        <View style={EstilosRecuperarNombreUsuario.contenedor}>
          <View style={[EstilosRecuperarNombreUsuario.contenidoResponsivo, width > 600 && EstilosRecuperarNombreUsuario.contenidoWeb]}>
            {/* NavBar Superior */}
            <NavBarSuperior
              titulo="Recuperar usuario"
              showBackButton={true}
              onBackPress={() => navigation.goBack()}
              rightButtonType="none"
              paddingHorizontal={5}
            />

            {/* Paso de verificación */}
            <Text style={EstilosRecuperarNombreUsuario.instruccion}>
              Para recuperar tu nombre de usuario, escribe tu correo electrónico para recibir tu usuario.
            </Text>

            {/* Campo de entrada */}
            <Input
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
            />

            {/* Snackbar para mostrar mensajes */}
            <CustomSnackbar
              visible={visible}
              setVisible={setVisible}
              message={message}
            />

            {/* Botón de enviar */}
            <Button
              titulo="Enviar"
              onPress={enviarSolicitud}
              textSize={20}
              textColor={Colors.fondo}
              padding={15}
              borderRadius={25}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default RecuperarNombreUsuario;
