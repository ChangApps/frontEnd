import {Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import axios from "axios";
import { RootStackParamList } from '../..//navegacion/AppNavigator';
import API_URL from "../../utils/API_URL";
import EstilosRecuperarContrasena3 from "../RecuperarAcceso/estilos/EstilosRecuperarContrasena3";
import { NavBarSuperior } from "../../componentes/NavBarSuperior";
import { useWindowDimensions } from 'react-native';
import { Button } from "../../componentes/Buttons";
import Colors from "../../assets/Colors";
import PasswordInput from "../../componentes/inputs/PasswordInput";
import { LinearGradient } from "expo-linear-gradient";
import PasoTituloIcono from "../../componentes/PasoTituloIcono";
import CustomSnackbar from '../../componentes/CustomSnackbar';
import { SafeAreaView } from 'react-native-safe-area-context';

const RecuperarContrasena3 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [password, setPassword] = useState(''); // Contraseña nueva
  const [confirmarPassword, setConfirmarPassword] = useState(''); // Confirmación de contraseña
  const [visible, setVisible] = useState(false);  // Estado para manejar la visibilidad del Snackbar
  const [message, setMessage] = useState("");  // Estado para almacenar el mensaje de error o éxito
  const route = useRoute<RouteProp<RootStackParamList, 'RecuperarContrasena3'>>();

  // Acceder al id desde los parámetros de la ruta
  const { id } = route.params;

  // Mostrar los datos pasados desde la pantalla anterior
  useEffect(() => {
    console.log('El id recibido es :', id);
  }, [id]);

  const ActualizarContrasenia = async () => {
    if (password !== confirmarPassword) {
      setMessage("Las contraseñas no coinciden.");
      setVisible(true);
      return;
    }

    try {
      // Realizar la solicitud PATCH para actualizar la contraseña
      const response = await axios.patch(`${API_URL}/actualizar-contrasena/`, {
        password: password, // Enviar la nueva contraseña
        id: id
      });

      if (response.status === 200) {
        setMessage("Contraseña actualizada correctamente.");
        setVisible(true);
        // Navegar a la pantalla de inicio de sesión o donde corresponda
        navigation.navigate('InicioDeSesion');
      } else {
        setMessage("Error al actualizar la contraseña.");
        setVisible(true);
      }
    } catch (error) {
      console.log("Error al actualizar la contraseña:", error);
      setMessage("Error al actualizar la contraseña.");
      setVisible(true);
    }
  };

  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={EstilosRecuperarContrasena3.safeContainer}>
      <LinearGradient colors={[Colors.degradeTop, Colors.degradeBottom]} style={EstilosRecuperarContrasena3.degradado}>
        <View style={EstilosRecuperarContrasena3.contenedor}>
          <View style={[EstilosRecuperarContrasena3.contenidoResponsivo, width > 600 && EstilosRecuperarContrasena3.contenidoWeb]}>
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
            <Text style={EstilosRecuperarContrasena3.instruccion}>
              Nueva contraseña
            </Text>

            <View style={EstilosRecuperarContrasena3.contenedorEntrada}>
              <PasswordInput
                placeholder="***************"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <Text style={EstilosRecuperarContrasena3.instruccion}>
              Confirmar contraseña
            </Text>

            <View style={EstilosRecuperarContrasena3.contenedorEntrada}>
              <PasswordInput
                placeholder="***************"
                value={confirmarPassword}
                onChangeText={setConfirmarPassword}
              />
            </View>

            {/* Snackbar para mostrar mensajes */}
            <CustomSnackbar
              visible={visible}
              setVisible={setVisible}
              message={message}
            />

            {/* Botón de enviar */}
            <Button
              titulo="Guardar"
              onPress={ActualizarContrasenia}
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

export default RecuperarContrasena3;

