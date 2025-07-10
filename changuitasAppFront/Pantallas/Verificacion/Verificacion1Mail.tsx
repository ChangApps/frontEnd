import { Alert, SafeAreaView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import API_URL from "../../utils/API_URL";
import EstilosVerificacion1Mail from "./estilos/EstilosVerificacion1Mail";
import { NavBarSuperior } from "../../componentes/NavBarSuperior";
import { useWindowDimensions } from 'react-native';
import { Button } from "../../componentes/Buttons";
import Colors from "../../assets/Colors";
import Input from "../../componentes/inputs/Input";
import { LinearGradient } from "expo-linear-gradient";
import PasoTituloIcono from "../../componentes/PasoTituloIcono";
import CustomSnackbar from '../../componentes/CustomSnackbar';

const Verificacion1Mail = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Verificacion1Mail'>>();
  const [codigo, setCodigo] = useState('');  // Estado para almacenar el código ingresado
  const [email, setEmail] = useState(''); // Estado para almacenar el email
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
        setMessage("El código a sido enviado al correo.");
        setVisible(true);
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
        console.log("Datos a enviar: ", route.params.datosUsuario);
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

  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={EstilosVerificacion1Mail.areaSegura}>
      <LinearGradient colors={[Colors.degradeTop, Colors.degradeBottom]} style={EstilosVerificacion1Mail.degradado}>
        <View style={EstilosVerificacion1Mail.contenedor}>
          <View style={[EstilosVerificacion1Mail.contenidoResponsivo, width > 600 && EstilosVerificacion1Mail.contenidoWeb]}>
            <NavBarSuperior
              titulo="Verificación"
              showBackButton={true}
              onBackPress={() => navigation.goBack()}
              rightButtonType="none"
            />

            <PasoTituloIcono
              iconName="mail-outline"
              texto="PASO 1:"
            />
            <Text style={EstilosVerificacion1Mail.instruccion}>
              Ingrese el código numérico que se ha enviado a su correo electrónico:
            </Text>

            {/* Campo de entrada */}
            <Input
              placeholder="Código"
              value={codigo}
              onChangeText={setCodigo}
            />

            {/* Botón para validar el código  onPress=validarCodigo */}
            <Button
              titulo="Siguiente"
              onPress={validarCodigo}
              textSize={20}
              textColor={Colors.fondo}
              padding={15}
              borderRadius={25}
            />

          </View>

          <CustomSnackbar
            visible={visible}
            setVisible={setVisible}
            message={message}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Verificacion1Mail;
