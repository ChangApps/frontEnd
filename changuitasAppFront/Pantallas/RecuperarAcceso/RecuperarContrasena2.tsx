import { Alert, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import API_URL from "../../utils/API_URL";
import EstilosRecuperarContrasena2 from "../RecuperarAcceso/estilos/EstilosRecuperarContrasena2";
import { NavBarSuperior } from "../../componentes/NavBarSuperior";
import { useWindowDimensions } from 'react-native';
import { Button } from "../../componentes/Buttons";
import Colors from "../../assets/Colors";
import Input from "../../componentes/inputs/Input";
import { LinearGradient } from "expo-linear-gradient";
import PasoTituloIcono from "../../componentes/PasoTituloIcono";
import CustomSnackbar from '../../componentes/CustomSnackbar';
import { SafeAreaView } from 'react-native-safe-area-context';

const RecuperarContrasena2 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [codigo, setCodigo] = useState("");  // Estado para el codigo
  const [visible, setVisible] = useState(false);  // Estado para manejar la visibilidad del Snackbar
  const [message, setMessage] = useState("");  // Estado para almacenar el mensaje de error o éxito
  const route = useRoute<RouteProp<RootStackParamList, 'RecuperarContrasena2'>>();

  // Acceder al email desde los parámetros de la ruta
  const { email } = route.params;

  // Mostrar los datos pasados desde la pantalla anterior
  useEffect(() => {
    console.log('Entrando al useEffect de contrasena2');
    console.log('Email recibido:', email);
  }, [email]);


  const obtenerId = async () => {
    try {
      // Verifica que el email esté presente antes de hacer la solicitud
      if (!email) {
        Alert.alert("Error", "El email es requerido.");
        return;
      }

      const response = await fetch(`${API_URL}/obtener-email-por-id/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("idObtenido: ", data.id);
        navigation.navigate('RecuperarContrasena3', { id: data.id });
      } else {
        Alert.alert("Error", "No se pudo obtener el ID.");
      }
    } catch (error) {
      setMessage("Error de conexión. Inténtalo de nuevo.");
      setVisible(true);
    }
  };

  const validarCodigo = async () => {

    const codigoInt = parseInt(codigo, 10);

    // Verifica si el código es un número válido
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
        console.log("Código válido");
        Alert.alert("Éxito", "Código válido");
        setMessage("El código es válido");
        setVisible(true);
        obtenerId(); // Llama a la función obtenerId después de la validación
      } else {
        setMessage(data?.email || "El código no es válido.");
        setVisible(true);
      }
    } catch (error) {
      setMessage("Error de conexión. Inténtalo de nuevo.");
      setVisible(true);
    }
  };

  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={EstilosRecuperarContrasena2.safeContainer}>
      <LinearGradient colors={[Colors.degradeTop, Colors.degradeBottom]} style={EstilosRecuperarContrasena2.degradado}>
        <View style={EstilosRecuperarContrasena2.contenedor}>
          <View style={[EstilosRecuperarContrasena2.contenidoResponsivo, width > 600 && EstilosRecuperarContrasena2.contenidoWeb]}>
            {/* NavBar Superior */}
            <NavBarSuperior
              titulo="Recuperar contraseña"
              showBackButton={true}
              onBackPress={() => navigation.goBack()}
              rightButtonType="none"
              paddingHorizontal={5}
            />

            <PasoTituloIcono
              iconName="mail-outline"
              texto="PASO 2:"
            />

            {/* Paso de verificación */}
            <Text style={EstilosRecuperarContrasena2.instruccion}>
              Ingrese el código numérico que se ha enviado.
            </Text>

            {/* Campo de entrada */}
            <Input
              placeholder=" "
              value={codigo}
              onChangeText={setCodigo}
            />

            {/* Snackbar para mostrar mensajes */}
            <CustomSnackbar
              visible={visible}
              setVisible={setVisible}
              message={message}
            />

            {/* Botón de enviar */}
            <Button
              titulo="Verificar código"
              onPress={validarCodigo}
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

export default RecuperarContrasena2;