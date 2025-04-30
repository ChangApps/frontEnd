import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import axios from "axios";
import { Snackbar } from "react-native-paper";
import { RootStackParamList } from '../..//navegacion/AppNavigator';
import API_URL from "../../auxiliares/API_URL";
import EstilosRecuperarContrasena3 from "../RecuperarAcceso/estilos/EstilosRecuperarContrasena3";

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
    console.log('Entrando al useEffect de contrasena3');
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
        id:id 
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
      console.error("Error al actualizar la contraseña:", error);
      setMessage("Error al actualizar la contraseña.");
      setVisible(true);
    }
  };

  return (
    <SafeAreaView style={EstilosRecuperarContrasena3.areaSegura}>
      <View style={EstilosRecuperarContrasena3.contenedor}>
        {/* Título de la pantalla */}
        <Text style={EstilosRecuperarContrasena3.titulo}>Recuperar contraseña</Text>

        <View style={EstilosRecuperarContrasena3.contenedorEntrada}>
          <Text style={EstilosRecuperarContrasena3.etiqueta}>Nueva contraseña</Text>
          <View style={EstilosRecuperarContrasena3.contenedorEntradaContrasena}>
            <TextInput
              placeholder="***************"
              placeholderTextColor="#666"
              secureTextEntry={!mostrarContrasena}
              style={EstilosRecuperarContrasena3.entradaContrasena}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity 
              style={EstilosRecuperarContrasena3.iconoOjo}
              onPress={() => setMostrarContrasena(!mostrarContrasena)}
            >
              <Ionicons 
                name={mostrarContrasena ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>

          <Text style={EstilosRecuperarContrasena3.etiqueta}>Confirmar contraseña</Text>
          <View style={EstilosRecuperarContrasena3.contenedorEntradaContrasena}>
            <TextInput
              placeholder="***************"
              placeholderTextColor="#666"
              secureTextEntry={!mostrarContrasena}
              style={EstilosRecuperarContrasena3.entradaContrasena}
              value={confirmarPassword}
              onChangeText={setConfirmarPassword}
            />
            <TouchableOpacity 
              style={EstilosRecuperarContrasena3.iconoOjo}
              onPress={() => setMostrarContrasena(!mostrarContrasena)}
            >
              <Ionicons 
                name={mostrarContrasena ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>
        </View>

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
          style={EstilosRecuperarContrasena3.botonSiguiente} 
          onPress={ActualizarContrasenia}
          // onPress={() => navigation.navigate('PantallaInicioSesion')} 
        >
          <Text style={EstilosRecuperarContrasena3.textoBoton}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RecuperarContrasena3;

