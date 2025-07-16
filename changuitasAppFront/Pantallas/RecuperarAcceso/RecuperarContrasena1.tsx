import { Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import API_URL from "../../utils/API_URL";
import EstilosRecuperarContrasena1 from "../RecuperarAcceso/estilos/EstilosRecuperarContrasena1";
import { NavBarSuperior } from "../../componentes/NavBarSuperior";
import { useWindowDimensions } from 'react-native';
import { Button } from "../../componentes/Buttons";
import Colors from "../../assets/Colors";
import Input from "../../componentes/inputs/Input";
import { LinearGradient } from "expo-linear-gradient";
import PasoTituloIcono from "../../componentes/PasoTituloIcono";
import CustomSnackbar from '../../componentes/CustomSnackbar';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  const { width } = useWindowDimensions();

  return (
    <SafeAreaView edges={['top']} style={EstilosRecuperarContrasena1.safeContainer}>
      <LinearGradient colors={[Colors.degradeTop, Colors.degradeBottom]} style={EstilosRecuperarContrasena1.degradado}>
        <View style={EstilosRecuperarContrasena1.contenedor}>
          <View style={[EstilosRecuperarContrasena1.contenidoResponsivo, width > 600 && EstilosRecuperarContrasena1.contenidoWeb]}>
            {/* NavBar Superior */}
            <NavBarSuperior
              titulo="Recuperar contraseña"
              showBackButton={true}
              onBackPress={() => navigation.goBack()}
              rightButtonType="none"
              paddingHorizontal={5}
            />

            <Text style={EstilosRecuperarContrasena1.instruccion}>
              Para recuperar tu contraseña, escribe la dirección de correo electrónico para recibir el código de recuperación.
            </Text>

            <PasoTituloIcono
              iconName="mail-outline"
              texto="PASO 1:"
            />

            {/* Campo de entrada */}
            <Input
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
            />

            <CustomSnackbar
              visible={visible}
              setVisible={setVisible}
              message={message}
            />

            {/* Botón de enviar */}
            <Button
              titulo="Enviar"
              onPress={enviarCodigo}
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

export default RecuperarContrasena1;